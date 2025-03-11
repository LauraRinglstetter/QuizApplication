<template>
    <div>
      <p v-if="username">Willkommen zurück, {{ username }}!</p>
      <h1>Dein Dashboard</h1>
      <div class="categories">
        <div class="quiz-general">
          <p> Erweitere deine Kenntnisse und starte ein Quiz!</p>
          <div class="buttons">
            <router-link to="/categories" class="quiz">Los geht's</router-link>
          </div>
        </div>
        <div class="cooperative">
          <p> Du möchtest gemeinsam mit anderen Studierenden lernen?</p>
          <button @click="goToMultiplayerPage"> Starte ein kooperatives Spiel</button>
        </div>
        <div class="extend-questions">
          <p> Möchtest du eure gemeinsamen Lerninhalte erweitern und eigene Fragen hinzufügen?</p>
          <button @click="goToQuestionsPage"> Erweitere den Fragenkatalog </button>
        </div>
        <div class="best-list">
          <p> Hier findest du die aktuelle Bestenliste der IU</p>
          <button @click="goToLeaderboard"> Zum Leaderboard </button>
        </div>
      </div>     
    </div>
  </template>
  
  <script>
 import { jwtDecode } from 'jwt-decode'; // Importiere die jwt-decode Bibliothek
  export default {
    name: 'HomePage',
    data() {
    return { 
      username: '' // Hier speichern wir den Benutzernamen
    };
  },
  mounted() {
    this.getUserData(); // Hole die Benutzerdaten, wenn die Komponente gemountet wird
  },
  methods: {
    getUserData() {
      const token = sessionStorage.getItem('token'); // Hole den Token aus localStorage
      if (token) {
        try {
          const decodedToken = jwtDecode(token);// Decodiere den Token
          console.log(decodedToken);
          this.username = decodedToken.username; // Setze den Benutzernamen
        } catch (error) {
          console.error('Fehler beim Decodieren des Tokens:', error);
        }
      }
    },
    goToQuiz(category) {
      this.$router.push({name: 'quiz', query: {category}}); 
    },
    goToLeaderboard() {
      this.$router.push('/leaderboard');
    },
    goToQuestionsPage(){
      this.$router.push('/questions'); 
    },
    goToMultiplayerPage(){
      this.$router.push('/multiplayer'); 
    },
  }
};


  </script>
  
<style scoped>
 button, a{
  appearance: none;
  padding: 0.5rem 1rem;
  background-color: rgba(10, 166, 215, 1);
  color: #fff;
  text-transform: uppercase;
  border-radius: 0.5rem;
  border: none;
  display:block;
  margin: 0 auto;
  cursor:pointer;
  text-decoration: none;
  font-size: 18px;
}
.categories{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 70%;
  margin: 2rem auto;
  gap: 2rem;
}
.categories > div {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 2rem 1rem;
}
.buttons{
  display:flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content:center;
}
.buttons > button{
  margin: 0;
}
p{
  color: #000;
}
</style>
  