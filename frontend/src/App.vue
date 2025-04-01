<template>
  <div id="app">
    <nav class="nav">
      <p>Skillmaster <span>Skill up your life</span></p>

      <!-- Anzeige des Profils und des Logout-Buttons, wenn der Benutzer eingeloggt ist -->
      <button v-if="isLoggedIn" @click="goToProfile">Profil &#128100;</button>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
      <!-- <router-link to="/">Home</router-link> -->
      <!-- <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link> -->
    </nav>

    <!-- Hier wird die aktive Route angezeigt -->
    <div class="main"><router-view></router-view> </div>
    <!-- <h2>Teste die Verbindung zum Backend</h2>
    <button @click="getDataFromBackend">Daten vom Backend abrufen</button>
    <p v-if="message">{{ message }}</p> Nachricht vom Backend anzeigen -->
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

  methods: {
    checkLoginStatus() {
      // Überprüfe, ob der Token im sessionStorage vorhanden ist
      this.isLoggedIn = !!sessionStorage.getItem('token');
    },
    async getDataFromBackend() {
      try {
        const response = await axios.get('http://localhost:3000/api/test') // API-Call zum Backend
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
body, html{
  margin: 0;
  padding: 0;
  width: 100%;
}
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: 		#000;
  width: 100%;

}
.main{
  margin-top: 140px;
}
.nav{
  width: 100%;
  background-color: 	#f4f5f5;
  padding: 1em 3em;
  display: flex;
  gap: 2em;
  justify-content: flex-end;
  align-items:center;
  position:fixed;
  z-index:10;
  height: 130px;
  top: 0;
}
.nav > p{
  text-decoration: none;
  color: #546A7B;
  border: 1px solid #546A7B;
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
    border: 1px solid #000;
    padding: 0.5rem 1rem;
    border-radius: 8px;
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
