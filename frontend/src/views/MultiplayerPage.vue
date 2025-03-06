<template>
    <div>
    <router-link to="/home" class="exit button">Zurück zum Dashboard</router-link>
      <h1>Willkommen zum Multiplayer-Quiz!</h1>
      <button @click="sendMessage">Nachricht an den Server senden</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
    methods: {
      sendMessage() {
        // Nachricht an den Server senden
        this.$socket.emit("sendMessage", "Hallo Server!");
      }
    },
    mounted() {
      // Empfang von Nachrichten vom Server
      this.$socket.on("receiveMessage", (data) => {
        console.log("Nachricht vom Server:", data);
      });
    }
  };
  </script>
  