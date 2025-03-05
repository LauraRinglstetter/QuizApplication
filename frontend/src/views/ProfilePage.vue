<template>
    <div>
        <h1>Dein Profil</h1>
        <p class="icon">&#128100;</p>
        <table>
            <thead>
                <tr>
                    <th>Benutzername</th>
                    <th>Punktestand</th>
                </tr>
                
            </thead>
            <tbody>
                <tr>
                    <td>{{ username }}</td>
                    <td>{{ username.score }}</td>
                </tr>
            </tbody>
        </table>
        <router-link to="/home" class="back">Zurück zum Dashboard</router-link>
    </div>
</template>
<script>
import { jwtDecode } from 'jwt-decode'; // Importiere die jwt-decode Bibliothek

export default {
  name: 'ProfilePage',
  data() {
    return {
      username: '',  // Benutzernamen speichern

    };
  },
  mounted() {
    this.getUserData(); // Benutzerdaten beim Laden der Seite holen
  },
  methods: {
    getUserData() {
      const token = localStorage.getItem('token'); // Hole den Token aus dem localStorage
      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decodiere den Token
          console.log(decodedToken);

          this.username = decodedToken.username; // Benutzernamen setzen

          this.score = decodedToken.score;       // Falls im Token vorhanden, Punktestand setzen
        } catch (error) {
          console.error('Fehler beim Decodieren des Tokens:', error);
        }
      }
    },
  },
};
</script>
<style scoped>
.icon{
    font-size: 50px;
    margin: 0;
}
</style>
