<template>
    <div>
        <router-link to="/home" class="exit">Zurück zum Dashboard</router-link>
        <h1>Leaderboard</h1>
        <table>
            <thead>
                <tr>
                    <th>Platz</th>
                    <th>Benutzername</th>
                    <th>Punktestand</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in leaderboard" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.score }}</td>
                </tr>
            </tbody>
        </table> 
        
    </div>
</template>
<script>
export default {
  name: "LeaderboardPage",
  data() {
    return {
      leaderboard: [], // Hier wird die Bestenliste gespeichert
    };
  },
  created() {
    fetch(`${import.meta.env.VUE_APP_API_BASE}/leaderboard`)
      .then((response) => response.json())
      .then((data) => {
        this.leaderboard = data; // Backend-Daten speichern
      })
      .catch((error) => console.error("Fehler beim Laden der Bestenliste:", error));
  },
};

</script>
<style>
table{
    width: 50%;
    background-color: #ad986e;
    color: #fff;
    margin: 2rem auto;
    padding: 2rem;
    font-size: 20px;
    border-collapse: collapse;
}
table tr {
    border-bottom: 1px solid #fff;
}
table td, table th {
    padding: 1rem;
}
</style>