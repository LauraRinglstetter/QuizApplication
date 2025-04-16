<template>
    <div class="container-questions">
        <router-link to="/home" class="exit button">Zurück zum Dashboard</router-link>
        <h1>Fragenkataloge</h1>
        <p>Erstelle eine neue Kategorie oder erweitere Fragen in den bisherigen Kategorien!</p>
        <!-- Plus-Symbol für neue Kategorie -->
        <div class="add-category">
            <button @click="showAddCategoryForm = !showAddCategoryForm" class="add-category-button">
                <span>+</span> Neue Kategorie
            </button>
        </div>
        <!-- Formular zum Hinzufügen einer Kategorie -->
        <div v-if="showAddCategoryForm" class="add-category-form">
        <input
            v-model="newCategory"
            type="text"
            placeholder="Kategorie Name"
            class="category-input"
        />
        <button @click="addCategory" class="add-category-submit">Hinzufügen</button>
        </div>
        <!-- Fehlermeldung anzeigen -->
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>
        <div class="overview">
            <div v-for="category in allCategories" :key="category" class="category">
              <h3>{{ category }}</h3>
              <span @click="selectCategory(category)" class="question-button">Neue Frage hinzufügen</span>  
              <span @click="seeAllQuestions(category)" class="question-button">Alle Fragen anzeigen</span>     
       
            </div> 
        </div>
        <!-- Fragen anzeigen -->
        <div v-if="questions.length > 0" class="questions-list" ref="questionList">
            <h2>Fragen für diese Kategorie {{ category }}</h2>
            <ul>
                <li v-for="(question, index) in questions" :key="index" class="question-item">
                    <strong>Frage:</strong> {{ question.question }} <br />
                    <strong>Antwortmöglichkeiten:</strong>
                    <ul class="options-list">
                        <li v-for="(option, idx) in question.options" :key="idx">
                            {{ option }} <span v-if="idx === question.answer">✅</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>


        <!-- Erfolgreiche Nachricht anzeigen -->
        <div v-if="successMessage" class="success-message">
            {{ successMessage }}
        </div>
        

        <!-- Formular für das Hinzufügen von Fragen -->
        <div v-if="selectedCategory" class="question-form" ref="questionForm">
            <h2>Neue Frage hinzufügen - {{ selectedCategory }}</h2>
            <input
                v-model="newQuestion"
                type="text"
                placeholder="Frage"
                class="question-input"
            />
            <div v-for="(option, index) in options" :key="index" class="option-input">
                <input
                  v-model="options[index]"
                  type="text"
                  :placeholder="'Antwortoption ' + (index + 1)"
                  class="option-field"
                />
            </div>
            <div class="answer-selection">
                <label>Wähle die richtige Antwort:</label>
                <select v-model="correctAnswer" class="answer-select">
                  <option v-for="(option, index) in options" :key="index" :value="index">
                      Antwort {{ index + 1 }}
                  </option>
                </select>
            </div>
            <button @click="submitQuestion">Frage hinzufügen</button>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { nextTick } from "vue";

export default {
  data() {
    return {
      categories: [], // aus der Datenbank
      temporaryCategories: [], // Temporäre Kategorien aus dem LocalStorage
      showAddCategoryForm: false, // Steuert die Sichtbarkeit des Formulars
      newCategory: "", // Hält den Namen der neuen Kategorie
      selectedCategory: null,
      newQuestion: "", // Die Frage, die hinzugefügt wird
      options: ["", "", "", ""], // Antwortmöglichkeiten
      correctAnswer: null, // Index der richtigen Antwort
      successMessage: "",
      errorMessage: "", 
      questions: [] // Hält die Fragen zur ausgewählten Kategorie
    };
  },
  async mounted() {
    await this.fetchCategories();
    this.loadTemporaryCategories(); // Lade temporäre Kategorien aus dem LocalStorage
  },
  computed: {
    // Kombiniert die Kategorien aus der Datenbank und den temporären Kategorien
    allCategories() {
      return [...new Set([...this.categories, ...this.temporaryCategories])];
    },
  },
  methods: {
    async seeAllQuestions(category) {
        //this.selectedCategory = category; // Setze die aktuelle Kategorie
        this.questions = []; // Zurücksetzen der Fragenliste
        
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_BASE}/questions?category=${category}`);
          this.questions = response.data.map(q => ({
            question: q.question,
            options: JSON.parse(q.options), // Optionen als JSON umwandeln
            answer: q.answer,
            selected: null,
          }));
        } catch (error) {
            console.error("Fehler beim Abrufen der Fragen:", error);
            this.errorMessage = "Fehler beim Laden der Fragen.";
        }
        nextTick(() => {
        if (this.$refs.questionList) {
          this.$refs.questionList.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
    async fetchCategories() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE}/categories`);// API-Aufruf
        this.categories = response.data.map(cat => cat.category);
        console.log(this.categories);
      } catch (error) {
        console.error("Fehler beim Abrufen der Kategorien:", error);
      }
    },
    // Lade die temporären Kategorien aus dem LocalStorage
    loadTemporaryCategories() {
      const storedCategories = localStorage.getItem("temporaryCategories");
      if (storedCategories) {
        this.temporaryCategories = JSON.parse(storedCategories); // Lade die temporären Kategorien
      }
    },
    // Methode zum Hinzufügen einer neuen Kategorie (nur im LocalStorage speichern)
    addCategory() {
      if (this.newCategory.trim() === "") {
        this.errorMessage = "Bitte einen Namen für die Kategorie eingeben.";
        this.clearMessages();
        return;
      }
      const newCategoryLower = this.newCategory.trim().toLowerCase();

        // Überprüfen, ob die Kategorie bereits existiert (unabhängig von Groß-/Kleinschreibung)
        const categoryExists = this.allCategories.some(cat => cat.toLowerCase() === newCategoryLower);

        if (categoryExists) {
            this.errorMessage = "Diese Kategorie existiert bereits!";
            this.clearMessages();
            return;
        }

      // Füge die neue Kategorie zu den temporären Kategorien hinzu
      this.temporaryCategories.push(this.newCategory);

      // Speichere die neuen temporären Kategorien im LocalStorage
      localStorage.setItem("temporaryCategories", JSON.stringify(this.temporaryCategories));


      // Setze das Eingabefeld zurück und schließe das Formular
      this.newCategory = "";
      this.showAddCategoryForm = false;
      this.successMessage = "Kategorie erfolgreich hinzugefügt!";
      this.clearMessages();
    },
    // Kategorie auswählen
    selectCategory(category) {
      this.selectedCategory = category; // Setze die ausgewählte Kategorie
      // Warten, bis das DOM aktualisiert wurde, dann scrollen zum Fragenformular
      nextTick(() => {
        if (this.$refs.questionForm) {
          this.$refs.questionForm.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
    // Prüft, ob die Kategorie aus dem localStorage stammt
    isTemporaryCategory(category) {
        return this.temporaryCategories.includes(category);
    },

    // Löscht eine Kategorie, wenn sie nur temporär (also im localStorage) gespeichert ist
    deleteCategory(category) {
        if (!this.isTemporaryCategory(category)) return; // Falls die Kategorie in der DB ist, nichts tun

        // Entferne die Kategorie aus dem Array
        this.temporaryCategories = this.temporaryCategories.filter(cat => cat !== category);

        // Aktualisiere localStorage
        localStorage.setItem("temporaryCategories", JSON.stringify(this.temporaryCategories));

        this.successMessage = "Kategorie wurde gelöscht.";
        this.clearMessages();
    },
    
    // Methode zum Hinzufügen einer neuen Frage
    async submitQuestion() {
      if (this.newQuestion.trim() === "" || this.options.some(option => option.trim() === "") || this.correctAnswer === null) {
        this.errorMessage = "Bitte füllen Sie alle Felder aus.";
        this.clearMessages();
        return;
      }

      const questionData = {
        question: this.newQuestion,
        options: [...this.options],
        answer: this.correctAnswer, // Index der richtigen Antwort
        category: this.selectedCategory, // Zugehörige Kategorie
      };
      
      try {
        // Sende die Frage an das Backend, um sie in der Datenbank zu speichern
        await axios.post(`${process.env.VUE_APP_API_BASE}/questions`, questionData);
        this.successMessage = "Frage erfolgreich hinzugefügt!";

        // Zurücksetzen des Formulars nach dem Absenden
        this.newQuestion = "";
        this.options = ["", "", "", ""];
        this.correctAnswer = null;
      } catch (error) {
        this.errorMessage = "Es gab ein Problem beim Hinzufügen der Frage.";
        this.clearMessages();
      }
    },
    clearMessages() {
        setTimeout(() => {
            this.successMessage = "";
            this.errorMessage = "";
        }, 5000);
    },
  },
};
</script>
<style scoped>
.container-questions{
  margin-top: 30px;
}
h1{
  font-weight: 300;
  color: #ad986e;
}
.overview{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    gap: 2rem;
    width: 70%;
    margin: 4rem auto;
}
.overview > div{
    width: 30%;
    padding: 2rem 1rem ;
    border-radius: 10px;
    background-color: rgba(173, 152, 110, 0.3);
    color: #000;
    text-align: center;
    font-size: 1rem;
    cursor: pointer;
}
div > button{
    background-color: #ad986e;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
}
.question-form{
  margin-bottom: 5rem;
}
.add-category-form {
  display: flex;
  gap: 1rem;
  margin: 1rem auto;
  justify-content:center;
}
.question-form input, .question-form select, .add-category-form input{
  padding: 6px 12px;
  font-size: 1.2rem;
  
  
}
.question-form input, .question-form select{
  width: 90%;
  margin: 0.6rem auto;
}
.question-form .answer-selection{
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.success-message {
    color: green;
    background: #d4edda;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
}

.error-message {
    color: red;
    background: #f8d7da;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
}
.question-button{
    padding: 0.5rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    display:block;
    margin: 1rem auto;
    background-color: #ad986e;
    color: #fff;
}
.question-item {
  list-style: none;
  border: 1px solid #000;
  padding: 0.5rem;
  width: 90%;
  margin: 1rem auto;
  text-align:left;
}
.options-list {
  list-style: none;
  padding-left: 0;
}
@media(max-width: 1000px){
  .overview .category{
    width: 45%;
  }
}
@media(max-width: 580px){
  .overview .category{
    width: 90%;
    padding: 1rem;
  }
}
</style>