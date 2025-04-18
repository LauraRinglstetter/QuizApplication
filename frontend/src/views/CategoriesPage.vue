<template>
    <div>
        <router-link to="/home" class="exit button">Zurück zum Dashboard</router-link>
        <p> Wähle eine Kategorie aus um das Quiz zu starten</p>
        <div class="overview buttons">
            <button v-for="category in categories" :key="category" class="category" @click="goToQuiz(category)">
                {{ category }}         
            </button> 
        </div>
    </div>
</template>
<script>  
import axios from "axios";
export default {
    data() {
        return {
            categories: [], // aus der Datenbank
        };
    },
    async mounted() {
    await this.fetchCategories();
  },
    methods: {
        goToQuiz(category) {
            this.$router.push({name: 'quiz', query: {category}}); // Hier verwendest du this.$router, um zur Quiz-Seite zu navigieren
        },
        async fetchCategories() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}/categories`); // API-Aufruf
                this.categories = response.data.map(cat => cat.category);
            } catch (error) {
                console.error("Fehler beim Abrufen der Kategorien:", error);
            }
        },
    }
} 

</script>
<style scoped>
body{
    font-size: 20px;
    font-family: 'Arial', sans-serif;
}
p{
    text-align: center;
    font-size: 22px;
    margin-top: 5%;
}
.buttons{
    display:flex;
    flex-wrap:wrap;
    gap: 20px;
    justify-content:center;
    margin: 2%;
}

button{
    background:rgba(84, 106, 123, 0.3);
    border:1px solid rgba(84, 106, 123, 0.1);
    border-radius: 20px;
    padding: 5rem 7rem;
    cursor:pointer;
    font-size: 20px;
    flex:1;
    color: #000;
}
@media(max-width:1050px){
    button{
        padding: 2rem 2.5rem;
    }
}
</style>