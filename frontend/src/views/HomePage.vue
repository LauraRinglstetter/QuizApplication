<template>
    <div class="dashboard">
      <div class="hero">
        <img src="../assets/background-image.jpg">
        <div id="intro">
          <h1>Skillmaster Dashboard</h1>
          <h2 v-if="username">Willkommen zurück, {{ username }}!</h2>
          <p> Hier kannst du ein Quiz starten, die Fragenkataloge erweitern, gemeinsam mit anderen Spielern lernen und vieles mehr!</p>
        </div>
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
  margin: 0 auto;
}
.hero{
  height: 100vh;
  transform:translateY(-120px);
  width: 100%;
  height: 70vh;
}
.hero img{
  height: 70vh;
  width: 100%;
  object-fit:cover;
  z-index: -2;
}
#intro{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70vh;
  padding: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index:2;
}
.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 0.5 = 50% Dunkelheit */
  z-index: 1;
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
  background-color: rgba(84, 106, 123, 1);
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
  margin: 0 auto;
  gap: 2rem;
  padding-bottom: 2rem;
}
.categories-dashboard > div {
  padding: 2rem 1rem;
  background:rgba(84, 106, 123, 0.3);
  border:1px solid rgba(84, 106, 123, 0.1);
  border-radius: 20px;
}
.categories-dashboard p{
  color: #000;
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
@media(max-width:800px){
  #intro{
    padding: 5%;
  }
  .hero, #intro, .hero img{
    height: 80vh;
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
  