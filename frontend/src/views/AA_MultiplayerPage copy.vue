<template>
    <div>
      <h1>Multiplayer-Quiz</h1>
      <button @click="joinOrCreateLobby">Quiz starten</button>
  
      <div v-if="lobby">
        <p>Spieler in der Lobby: {{ lobby.players.length }} / {{ lobby.maxPlayers }}</p>
        <div v-if="lobby.players.length < lobby.maxPlayers">
          <p>Warten auf weitere Spieler...</p>
        </div>
        <div v-else>
          <p>Das Quiz startet jetzt!</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        lobby: null,  // Die aktuelle Lobby des Spielers
      };
    },
    methods: {
      joinOrCreateLobby() {
      // Sende Anfrage an Server, um einer bestehenden Lobby beizutreten oder eine neue zu erstellen
      this.$socket.emit('joinLobby');
    },
    },
    mounted() {
      // Empfang der Lobby-Updates vom Server
      this.$socket.on('lobbyUpdate', (lobby) => {
        this.lobby = lobby;
        console.log('Lobby-Update erhalten:', lobby);
      });
  
      // Wenn das Quiz startet
      this.$socket.on('startQuiz', () => {
        alert('Das Quiz startet jetzt!');
        // Leite zum Quiz weiter oder starte das Quiz
      });
    },
  };
  </script>
  