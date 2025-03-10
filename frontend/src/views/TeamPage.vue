<template>
    <div>
      <h1>Team: {{ teamId }}</h1>
      <p>Team-Punkte: {{ teamScore }}</p>
      <div v-if="question">
        <p>{{ question.text }}</p>
        <button v-for="option in question.options" :key="option" @click="submitAnswer(option)">
          {{ option }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        teamId: 'team1',  // Beispiel: Team ID
        teamScore: 0,
        question: null
      };
    },
    methods: {
      // Antwort einreichen
      submitAnswer(answer) {
        this.$socket.emit('submitAnswer', {
          teamId: this.teamId,
          answer: answer,
          correctAnswer: this.question.correctAnswer,
        });
      }
    },
    mounted() {
      this.$socket.on('updateScores', (score) => {
        this.teamScore = score;  // Punktestand aktualisieren
      });
  
      this.$socket.on('teamJoined', (data) => {
        console.log(`Team ${data.teamId} hat jetzt ${data.players.length} Mitglieder.`);
      });
    }
  };
  </script>
  