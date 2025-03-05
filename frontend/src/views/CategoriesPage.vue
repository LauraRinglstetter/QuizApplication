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
                const response = await axios.get("http://localhost:3000/api/categories"); // API-Aufruf
                this.categories = response.data.map(cat => cat.category);
                console.log(this.categories);
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
    gap: 20px;
    justify-content:center;
    margin-top: 5%;
}
button{
    background-color: #f4f5f5;
    border: none;
    padding: 5rem 7rem;
    border-radius: 5px;
    cursor:pointer;
    font-size: 20px;
}
</style>