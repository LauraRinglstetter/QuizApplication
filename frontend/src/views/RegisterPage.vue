<template>
  <div class="container">
    <div class="registerBox">
      <h1>Registrieren</h1>
      <form>
        <input type="text" placeholder="Username" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
        <input
          type="password"
          placeholder="Password (repeat)"
          v-model="password_repeat"
        />
        <input type="button" @click="signUp" value="Registrieren" />
      </form>
      
      <p v-if="msg">{{ msg }}</p>
      <!-- Text und Link zur Register-Seite -->
      <p class="register-text">
        Du hast bereits ein Konto?
        <router-link to="/">Hier anmelden</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      password_repeat: '',
      msg: ''
    };
  },
  methods: {
    async signUp() {
      // Überprüfen, ob die Passwörter übereinstimmen
      if (this.password !== this.password_repeat) {
        this.msg = "Passwörter stimmen nicht überein";
        return;
      } else if(this.password.length < 6){
        this.msg = "Das Passwort muss mindestens 6 Zeichen haben!";
        return;
      }
      try {
        const credentials = {
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat
        };
        // AuthService verwenden, um die Anmeldedaten an das Backend zu senden
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg; //Rückmeldung vom Backend
        this.$router.push('/');
      } catch (error) {
        this.msg = error;
      }
    }
  }
};
</script>
<style scoped>
.registerBox{
  width: 30%;
  min-width: 350px;
  margin: auto auto;
  margin-top: 200px;
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
  background-color: #ad986e;
  color: #fff;
  border: 1px solid #ad986e;
}
</style>