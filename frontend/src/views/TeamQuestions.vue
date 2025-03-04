<template>
    <div>
      <router-link to="/home" class="exit button">Zurück zum Dashboard</router-link>
      <h1>Team-Fragenkatalog</h1>
      <h2>Neue Kategorie & Frage</h2>
      <form>
        <label for="category">Kategorie</label>
        <input type="text" id="category" v-model="input_category" />
        <label for="question">Frage</label>
        <input type="text" id="question" v-model="input_question" />
        <label for="answer">Antwort</label>
        <input type="text" id="answer" v-model="input_answer" />
        <button @click.prevent="addQuestion">Frage hinzufügen</button>
      </form>
      
    </div>
  </template>
  
  <script>

  </script>
  