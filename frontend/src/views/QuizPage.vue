<template>
  <main class="app">  
      
      <h1>Multiple-choice Quiz</h1>
      <section class="quiz" v-if="!quizCompleted">
        <div class="timer">
          {{ formattedTime }}
        </div>
        <div class="quiz-info">
          <span class="question"> {{ getCurrentQuestion.question }}</span>
          <span class="score"> Score: {{ score }} / {{ questions.length }}</span>
        </div>
        <div class="options">
          <!-- Jede Option als Label dargestellt -->
           <!-- Dynmische CSS-Klassen basierend auf der Auswahl und der Antwort, disabled wenn bereits eine Antwort ausgewählt -->
          <label v-for="(option, index) in getCurrentQuestion.options" 
          :key="index" 
          :class="`option ${
            getCurrentQuestion.selected == index 
              ? index == getCurrentQuestion.answer 
                  ? 'correct' 
                  : 'wrong'
              : ''
            }${
            getCurrentQuestion.selected !== null && index !== getCurrentQuestion.selected 
              ? ' disabled' 
              : ''
            }${
              index === getCurrentQuestion.answer && getCurrentQuestion.selected !== null
                ? ' correct'
                : ''
              }
            `">
            <input 
              type="radio" 
              :name="getCurrentQuestion.index" 
              :value="index" 
              v-model="getCurrentQuestion.selected"
              :disabled = "getCurrentQuestion.selected !== null"
              @change="SetAnswer"
            />
            <span> {{ option }}</span>
          </label>
        </div>
        <button 
        @click="NextQuestion"
        :disabled="getCurrentQuestion.selected === null">
        {{ 
          getCurrentQuestion.index == questions.length - 1 
            ? 'Abschließen' 
            : 'Nächste Frage' 
        }}
        </button>
        <router-link to="/categories" class="stop-quiz">Quiz abbrechen</router-link>
      </section>
  
      <section v-else>
        <div class="quiz-end">
          <h2 v-if="timeExpired">Oops, die Zeit ist abgelaufen!</h2>
          <h2 v-else>Herzlichen Glückwunsch, du hast das Quiz abgeschlossen!</h2>
          <h3>Dein Punktestand:  {{ score }} / {{ questions.length }}</h3>
        </div>
        <button @click="goToHome">Zurück zur Startseite</button>
      </section>
    </main>
  </template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
// Timer für das Quiz
let timer = ref(90);
const timeExpired = ref(false);

let timerInterval = null;

// Methode, um den Timer zu starten
const startTimer = () => {
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--; // Timer herunterzählen
    } else {
      clearInterval(timerInterval); // Timer stoppen, wenn die Zeit abgelaufen ist
      endQuiz(); // Quiz beenden, wenn die Zeit abläuft
    }
  }, 1000); // Jede Sekunde herunterzählen
};
// Methode, um den Timer zu stoppen
const stopTimer = () => {
  clearInterval(timerInterval);
};

//Format des Timers
const formattedTime = computed(() => {
  const minutes = Math.floor(timer.value / 60);
  const seconds = timer.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Methode, um das Quiz zu beenden
const endQuiz = () => {
  quizCompleted.value = true;
  timeExpired.value = true; // Zeit abgelaufen
  saveScore(); // Punktestand speichern
  stopTimer(); // Timer stoppen
};

// Methode um zur Startseite zurückzukehren
const goToHome = () => {
  router.push('/home'); // Navigiert zur Home-Route
  stopTimer(); // Timer stoppen, wenn die Startseite aufgerufen wird
};
const category = route.query.category;

//Array mit den Quiz-Fragen
const questions = ref([]);

//Ist Quiz abgeschlossen?
const quizCompleted = ref(false);

//Index der aktuellen Frage
const currentQuestion = ref(0);

// Hole die Fragen von der API
const fetchQuestions = async (category) => {
  try {
    const response = await axios.get(`${import.meta.env.VUE_APP_API_BASE}/questions?category=${category}`);
    questions.value = response.data.map(q => ({
      question: q.question,
      options: JSON.parse(q.options), // Optionen als JSON umwandeln
      answer: q.answer,
      selected: null
    }));
  } catch (error) {
    console.error('Fehler beim Abrufen der Fragen:', error);
  }
};

// Aufruf der Funktion, wenn die Komponente geladen wird
onMounted(() => {
  fetchQuestions(category);
  startTimer(); // Timer starten
});

//Berechnung der Punkte
const score = computed(() => {
  let value = 0;
  questions.value.map(q => {
    if(q.selected == q.answer){
      value++;
    }
  })
  return value;
})

//Speichert den Punktestand in der Datenbank
const saveScore = async () => {
  try {
    const username = localStorage.getItem('username');

    if (!username) {
      console.error('Kein Benutzername gefunden');
      return;
    }
    
    const response = await axios.put(`${import.meta.env.VUE_APP_API_BASE}/leaderboard`, {
      username,
      score: score.value, // Berechneter Punktestand
    });

    console.log('Punktestand gespeichert:', response.data);
  } catch (error) {
    console.error('Fehler beim Speichern des Punktestands:', error);
  }
};

//Aktuelle Frage basierend auf dem Index
const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  // Wenn die Frage existiert, setze das Index-Feld
  if (question) {
    question.index = currentQuestion.value;
    return question;
  }

  // Falls keine gültige Frage gefunden wird (z.B. beim ersten Laden), gib ein leeres Objekt zurück
  return {};
})

//Speichert Antwort für aktuelle Frage
const SetAnswer = evt => {
  questions.value[currentQuestion.value].selected = evt.target.value;
}

//Nächste Frage, wenn keine Frage mehr: Quiz beenden
const NextQuestion = () => {
  if(currentQuestion.value < questions.value.length - 1){
    currentQuestion.value++;
  }else{
    quizCompleted.value = true;
    saveScore(); // Punktestand speichern
  }
};

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
}

.app{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width:100%;
  height:100%;
}
h1, h2, h3{
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 300;
  color: #fff;
}
.quiz{
  background-color: rgba(255, 255, 255, 0.7);
  padding: 1.5rem;
  width: 100%;
  max-width: 640px;
  border-radius: 10px;
  color: #000;
}
.quiz-info{
  display:flex;
  flex-wrap: wrap;
  justify-content:space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.quiz-info .question{
  font-size: 1.2rem;
}
.quiz-info .score{
  font-size: 1rem;
  font-style:italic;
}
.options{
  margin-bottom:1rem;
  display:flex;
  flex-direction:column;
  row-gap: 0.6rem;
}
.option{
  cursor:pointer;
  background-color: #ad986e;
  padding: 0.8rem;
  color: #fff;
}
.option:hover{
  background-color: #e4dac294;
}
.option.correct{
  background-color:green;
}
.option.wrong{
  background-color:red;
}
.option.disabled{
  opacity: 0.5;
}
.options input{
  display:none;
}
button{
  appearance: none;
  padding: 0.5rem 1rem;
  background-color: #ad986e;
  text-transform: uppercase;
  border-radius: 0.5rem;
  border: none;
  display:block;
  margin: 1rem auto;
  cursor:pointer;
  color: #fff;
}
button:disabled{
  opacity: 0.5;
  cursor: not-allowed;
}
.timer{
  margin-left: auto;
  margin-bottom: 2rem;
  padding: 6px 10px;
  border-radius: 50%;
  border: 1px solid #000;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  display:flex;
  align-items:center;
  justify-content:center;
}

.quiz-end h2, .quiz-end h3{
  margin-bottom: 1rem;
  font-size: 1.4rem;
}
.quiz-end{
  margin-bottom: 1rem;
}
.stop-quiz{
    margin: 3rem auto 1rem auto;
    display:block;
    width:fit-content;
    text-decoration: none;
    border: 1px solid #000;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    color: #000;
}

</style>