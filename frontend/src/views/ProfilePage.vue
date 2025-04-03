<template>
    <div>
      <router-link to="/home" class="back exit">Zurück zum Dashboard</router-link>
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
                    <td>{{ score }}</td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>
<script>
import { jwtDecode } from 'jwt-decode'; // Importiere die jwt-decode Bibliothek
import axios from 'axios'; 

export default {
  name: 'ProfilePage',
  data() {
    return {
      username: '',  // Benutzernamen speichern
      score: 0,      // Punktestand speichern
      id: '',  // Benutzer-ID speichern
    };
  },
  mounted() {
    this.getUserData(); // Benutzerdaten beim Laden der Seite holen
  },
  methods: {
    getUserData() {
      const token = sessionStorage.getItem('token'); // Ändere von localStorage zu sessionStorage
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log("Token-Daten:", decodedToken);

          this.username = decodedToken.username;
          this.id = decodedToken.id;

          this.fetchScore(); // Score aus der Datenbank holen
        } catch (error) {
          console.error('Fehler beim Decodieren des Tokens:', error);
        }
      }
    },
    fetchScore() {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId; // Verwende id statt userId

            // API-Aufruf mit userId (id) aus dem Token
            axios.get(`http://localhost:3000/api/users/score/${userId}`)
                .then((response) => {
                    this.score = response.data.score; // Punktestand im State speichern
                })
                .catch((error) => {
                    console.error('Fehler beim Abrufen des Scores:', error);
                });
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
