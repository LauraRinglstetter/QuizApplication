<template>
    <div>
        <router-link to="/home" class="exit button">Zurück zum Dashboard</router-link>
        <h1> Dein Fragenkatalog</h1>
        <div class="ownQuestions">
            <p @click="toggleForm"> Fragenkatalog (Ordner) hinzufügen <span>{{ showForm ? '−' : '+' }}</span></p>
            <div v-if="showForm">
                <h2>Frage hinzufügen</h2>
                <form @submit.prevent="addQuestion">
                    <input type="hidden" v-model="input_category" />
                    <h4>Frage</h4>
                    <input type="text" placeholder="Enter your question here" v-model="input_question"/>
                    <h4>Antwort</h4>
                    <div class="options">
                        <input type="textarea" placeholder="Gib hier deine Antwort ein" v-model="input_answer"/>
                    </div>
                    <input class="button" type="submit" value="Frage hinzufügen"/>
                </form>
            </div>
            <!-- Fragenliste anzeigen -->
            <div v-if="questions.length" class="savedQuestions">
                <h2>Gespeicherte Fragen</h2>
                <ul>
                    <li v-for="(question, index) in questions" :key="index">
                        <strong>Frage:</strong> {{ question.text }} <br>
                        <strong>Antwort:</strong> {{ question.answer }}
                        <button class="button" @click="removeQuestion(index)">Löschen</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, watch } from "vue";

export default {
    setup() {
        const showForm = ref(false);
        const input_question = ref("");
        const input_answer = ref("");
        const questions = ref([]);
        const input_category = ref("private");

        // Fragen aus LocalStorage laden
        onMounted(() => {
            const storedQuestions = localStorage.getItem("questions");
            if (storedQuestions) {
                questions.value = JSON.parse(storedQuestions);
            }
        });

        // Neue Frage hinzufügen
        const addQuestion = () => {
            if (input_question.value.trim() === "" || input_answer.value.trim() === "") {
                return;
            }
            questions.value.push({
                text: input_question.value,
                answer: input_answer.value,
            });

            // Speichern und Eingabefelder leeren
            input_question.value = "";
            input_answer.value = "";
        };

        // Frage löschen
        const removeQuestion = (index) => {
            questions.value.splice(index, 1);
        };

        // Fragen automatisch im LocalStorage speichern
        watch(questions, (newVal) => {
            localStorage.setItem("questions", JSON.stringify(newVal));
        }, { deep: true });

        // Formular ein- und ausblenden
        const toggleForm = () => {
            showForm.value = !showForm.value;
        };

        return {
            showForm,
            toggleForm,
            input_question,
            input_answer,
            input_category,
            questions,
            addQuestion,
            removeQuestion,
        };
    },
};
</script>
<style>
.ownQuestions form{
    width: 60%;
    margin: 2rem auto;
}
.ownQuestions > p {
    cursor:pointer;
}
.options{
    display:flex;
    flex-direction: column;
    gap: 1rem;
}
.options > input{
    font-size: 16px;
    padding: 5px;
}
h4{
    margin: 1rem 0;
}
.button{
    margin: 1rem auto;
    display:block;
    background-color: #0aa6d7;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    width: fit-content;
}
.exit{
    margin: 1rem 0 0 3em;
}
.savedQuestions{
    margin-top: 3em;
    border-top: 1px solid #000;
    color: #000;
}
.savedQuestions > ul{
    list-style: none;
}
.savedQuestions > ul li{
    border: 1px solid #000;
    padding: 20px;
    width: 70%;
    margin: 1em auto;
}

</style>
