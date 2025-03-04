<template>
    <div>
        <router-link to="/home" class="exit button">Zurück zum Dashboard</router-link>
        <p> Wähle eine Kategorie aus um das Quiz zu starten</p>
          <div class="buttons">
            <button @click="goToQuiz('Allgemeinwissen')">Allgemeinwissen</button>
            <button @click="goToQuiz('Geschichte')">Geschichte</button>
            <button @click="goToQuiz('Geografie')">Geografie</button>
          </div>
    </div>
</template>
<script>  
export default {
    methods: {
        goToQuiz(category) {
            this.$router.push({name: 'quiz', query: {category}}); // Hier verwendest du this.$router, um zur Quiz-Seite zu navigieren
        },
    }
} 

</script>
<style>
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