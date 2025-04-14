<template>
    <div class="dashboard">
      <div id="intro">
        <h1>Skillmaster Dashboard</h1>
        <h2 v-if="username">Willkommen zurück, {{ username }}!</h2>
        <p> Hier kannst du ein Quiz starten, die Fragenkataloge erweitern, gemeinsam mit anderen Spielern lernen und vieles mehr!</p>
      </div>
      <div class="categories-dashboard">
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
.dashboard{
  width: 100%;
  color: #fff;
  padding: 2rem 1rem;
  margin: 0 auto;
  
}
.dashboard h1, h2, p{
  font-weight: 400;
  color: #fff;
  letter-spacing: 1px;
}
#intro p{
  color: #fff;
}
 button, a{
  appearance: none;
  padding: 0.5rem 1rem;
  background-color: #ad986e;
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
.categories-dashboard{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 70%;
  margin: 2rem auto;
  gap: 2rem;
}
.categories-dashboard > div {
  padding: 2rem 1rem;
  background:#fff;
}
.categories-dashboard p{
  color: #ad986e;
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

@media(max-width:1150px){
  .categories-dashboard{
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    width: 90%;
  }
  .categories-dashboard > div{
    padding: 1rem;
  }
}
@media(max-width:600px){
  .categories-dashboard{
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    width: 95%;
  }

}
</style>
  