<template>
  <div class="app" :class="backgroundClass">
    <nav class="nav">
      <p>Skillmaster <span>Skill up your life</span></p>

      <!-- Anzeige des Profils und des Logout-Buttons, wenn der Benutzer eingeloggt ist -->
      <button v-if="isLoggedIn" @click="goToProfile">Profil &#128100;</button>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </nav>

    <!-- Hier wird die aktive Route angezeigt -->
    <div class="main"><router-view></router-view> </div>
  </div>
</template>

<script>
import axios from 'axios' // Importiere Axios

export default {
  name: 'App',
  data() {
    return {
      message: '', // Hier speichern wir die Nachricht vom Backend
      isLoggedIn: false // Initialer Status des Benutzers
    }
  },
  computed: {
    backgroundClass() {
      // Wenn die aktuelle Route die Fragen-Seite ist, entfernen wir das Hintergrundbild
      return this.$route.name === 'questions' ? 'no-background' : '';
    }
  },

  methods: {
    checkLoginStatus() {
      // Überprüfe, ob der Token im sessionStorage vorhanden ist
      this.isLoggedIn = !!sessionStorage.getItem('token');
    },
    async getDataFromBackend() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE}/test`);// API-Call zum Backend
        this.message = response.data.message // Speichere die Antwort in der "message"-Variable
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error)
      }
    },
    // Logout-Funktion: Entfernt das Token aus dem localStorage und leitet den Benutzer zur Startseite um
    logout() {
      sessionStorage.removeItem('token'); // Entfernt das Token aus dem localStorage
      this.isLoggedIn = false; 
      this.$router.push('/'); // Weiterleitung zur Login-Seite
    },
    goToProfile() {
      this.$router.push('/profile'); 
    }
  },
  watch: {
    // Überwacht den Status von sessionStorage und aktualisiert `isLoggedIn`
    '$route'() {
      this.checkLoginStatus();
    }
  },
  mounted() {
    // Überprüft den Login-Status beim ersten Laden der Seite
    this.checkLoginStatus();
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body, html, #app{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: 		#000;
  
  height: 100%;
}

.app{
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
                  url('assets/background-image.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.no-background {
  background-image: none;
}
.nav{
  width: 100%;
  background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
  padding: 1em 3em;
  display: flex;
  gap: 2em;
  justify-content: flex-end;
  align-items:center;
  position:relative;
  z-index:10;
  top: 0;
  height: 120px;
}
.main{
  width:100%;
  height: calc(100vh - 120px);
}

.nav > p{
  text-decoration: none;
  color: #fff;
  border: 1px solid #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  height: fit-content;
}
.nav > p:first-of-type{
  font-size: 1.5rem;
  font-weight: bold;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  margin: 1rem auto 1rem 0;
  position: absolute;
  top: auto;
  left: 1rem;
}
.nav > p:first-of-type span{
  font-weight: normal;
  font-size: 1rem;
}
.nav button{
  background-color: #fff;
  color: #546A7B;
  border: 1px solid #fff;
  font-size: 18px;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}
.exit{
    margin: 1rem auto;
    margin-left: 2rem;
    display:block;
    width:fit-content;
    text-decoration: none;
    border: 1px solid #ad986e;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    color: #ad986e;
    background-color: #fff;
}

/*Responsive Design*/
@media(max-width: 540px){
  .nav{
    padding: 0.5em;
    gap: 0.5em;
  }
  .nav > p:first-of-type{
    font-size: 1rem;
    margin: 0;
    padding: 0.2rem 0.5rem;
  }
}

</style>
