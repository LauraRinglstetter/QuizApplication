<template>
  <div class="container">
    <div class="loginBox">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
        <input type="button" @click="login" value="Anmelden" />
      </form>
    
    <p v-if="msg">{{ msg }}</p> <!-- Zeigt eine Nachricht, wenn es einen Fehler gibt -->
    <!-- Text und Link zur Register-Seite -->
    <p class="register-text">
        Noch kein Konto? 
        <router-link to="/register">Hier registrieren</router-link>
      </p>
    </div>
  </div>
  </template>
  
  <script>
  import AuthService from '@/services/AuthService.js'; // AuthService importieren

  export default {
    name: 'LoginPage',
    data() {
    return {
      username: '',
      password: '',
      msg: '' // Nachricht, die vom Backend kommt
      };
    },
    methods: {
    async login() {
      try {
        // Sende die Login-Daten an das Backend
        const credentials = {
          username: this.username,
          password: this.password
        };
        
        const response = await AuthService.login(credentials); // Verwende AuthService, um Login zu verarbeiten
        this.msg = response.message; // Zeige die Erfolgsmeldung oder Fehler an

        // Wenn der Login erfolgreich war, weiterleiten oder Token speichern
        sessionStorage.setItem('token', response.token); // Speichere den Token in localStorage oder in Vuex
        sessionStorage.setItem('username', this.username); 
        this.$router.push('/home'); // Weiterleiten zur Startseite nach erfolgreichem Login
      } catch (error) {
        console.error('Login-Fehler:', error);
        if (error.response && error.response.data) {
          console.error('Fehler-Response:', error.response.data);
          this.msg = error.response.data; // Zeige die Fehlermeldung vom Backend an
        } else if (error.message) { // Fallback für message
          this.msg = error.message;
        } else {
          this.msg = 'Es gab ein Problem mit dem Login. Bitte versuche es später erneut.'; // Fallback-Fehlermeldung
        }
      }
    }
  }
  }
  </script>
  
<style>
.container{
  width: 100%;
  height: calc(100vh - 100px);
  background-image: url('../assets/background-image.jpg');
  background-size:cover;
  display:flex;
  flex-direction:column;
}
.loginBox{
  width: 30%;
  min-width: 300px;
  margin: auto auto;
  border: 1px solid #000;
  padding: 1em 1em 2em 1em;
  background-color: #fff;
}
form{
  width: 100%;
  display:flex;
  flex-direction: column;
  gap: 1.4rem;
}
.register-text{
  margin-top: 2em;
}
form > input{
  font-size: 16px;
  padding: 5px;
}
form > input[type="button"]{
  background-color: #546A7B;
  color: #fff;
}
</style>
  