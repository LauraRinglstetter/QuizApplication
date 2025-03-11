<template>
  <div>
    <router-link to="/home" class="exit button">Zurück zum Dashboard</router-link>
    <h1>Multiplayer-Quiz</h1>
    <p>Wähle eine Kategorie aus, um das Quiz zu starten</p>
    
    <div class="overview buttons">
      <button 
        v-for="category in categories" 
        :key="category" 
        class="category" 
        @click="selectCategory(category)"
        :class="{ selected: selectedCategory === category }">
        {{ category }}         
      </button> 
    </div>
    
    <button v-if="!lobby && selectedCategory" @click="joinLobby">Quiz starten</button>

    <div v-if="lobby">
      <p>Lobby-ID: {{ lobby.id }}</p>
      <p>Spieler in der Lobby: {{ lobby.players.length }} / 2</p>
      <div v-if="lobby.players.length < 2">
        <p>Warten auf weiteren Spieler...</p>
      </div>
      <div v-else>
        <p>Das Quiz startet jetzt!</p>
      </div>
    </div>

    <div v-if="quizStarted">
      <h2>{{ currentQuestion.question }}</h2>
      <div class="options">
        <button 
          v-for="(option, index) in currentQuestion.options" 
          :key="index" 
          @click="sendAnswer(index)"
          :disabled="hasAnswered">
          {{ option }}
        </button>
      </div>
      <p v-if="answerFeedback">{{ answerFeedback }}</p>
    </div>

    <p v-if="gameOver">
      Spiel beendet! Dein Score: {{ score }} <br>
      Euer gemeinsamer Team-Score: {{ teamScore }}
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { socket } from "@/main"; // Importiere die Socket-Instanz aus main.js
import axios from "axios";

export default {
  setup() {
    const categories = ref([]); // Kategorien aus der Datenbank
    const selectedCategory = ref(null);
    const hasAnswered = ref(false); // Flag, das überprüft, ob der Spieler bereits geantwortet hat
    const lobby = ref(null);
    const quizStarted = ref(false);
    const currentQuestion = ref({});
    const answerFeedback = ref('');
    const score = ref(0);
    const gameOver = ref(false);
    const teamScore = ref(0);

    // Abrufen der Kategorien
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories");
        categories.value = response.data.map(cat => cat.category);
      } catch (error) {
        console.error("Fehler beim Abrufen der Kategorien:", error);
      }
    };

    // Spieler wählt eine Kategorie
    const selectCategory = (category) => {
      selectedCategory.value = category;
    };

    // Spieler tritt der Lobby bei
    const joinLobby = () => {
      if (!selectedCategory.value) return;
      console.log('Joining lobby for category:', selectedCategory.value);
      socket.emit('joinLobby', { category: selectedCategory.value });
    };

    // Spieler sendet seine Antwort
    const sendAnswer = (answerIndex) => {
      if (hasAnswered.value) return; // Verhindert, dass der Spieler erneut antwortet
      socket.emit('answerQuestion', { lobbyId: lobby.value.id, answer: answerIndex });
      hasAnswered.value = true; // Markiert, dass der Spieler geantwortet hat
    };

    // Update der Lobby, wenn ein Spieler beitritt
    socket.on('lobbyUpdate', (data) => {
      lobby.value = data;
    });

    // Quiz wird gestartet
    socket.on('startQuiz', () => {
      quizStarted.value = true;
      socket.emit('requestFirstQuestion', lobby.value.id);
    });

    // Neue Frage wird empfangen
    socket.on('newQuestion', (question) => {
      currentQuestion.value = {
        question: question.question,
        options: question.options,
        correct: question.correct,
      };
      answerFeedback.value = '';
      hasAnswered.value = false; // Setze das Flag zurück, wenn eine neue Frage kommt
    });

    // Feedback zur Antwort
    socket.on('answerFeedback', (feedback) => {
      answerFeedback.value = feedback.message;
      if (feedback.correct) {
        score.value += 1;
      }
    });

    // Das Spiel ist vorbei
    socket.on('gameOver', (data) => {
      gameOver.value = true;
      teamScore.value = data.teamScore; 
      saveScore(); // Punktestand speichern
    });
    //Speichert den Punktestand in der Datenbank
    const saveScore = async () => {
      try {
        const username = localStorage.getItem('username');

        if (!username) {
          console.error('Kein Benutzername gefunden');
          return;
        } 

        const response = await axios.put('http://localhost:3000/api/leaderboard', {
          username,
          score: score.value, // Berechneter Punktestand
        });

        console.log('Punktestand gespeichert:', response.data);
      } catch (error) {
        console.error('Fehler beim Speichern des Punktestands:', error);
      }
    };

    // Kategorien beim Laden der Seite abrufen
    fetchCategories();

    return {
      categories,
      selectedCategory,
      hasAnswered,
      lobby,
      quizStarted,
      currentQuestion,
      sendAnswer,
      answerFeedback,
      score,
      teamScore,
      gameOver,
      selectCategory,
      joinLobby,
    };
  },
};
</script>

<style scoped>
button {
  padding: 10px;
  margin: 5px;
  cursor: pointer;
}
.selected {
  background-color: #4caf50;
  color: white;
}
.options {
  display: flex;
  flex-direction: column;
}
</style>
