import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';
import { io } from 'socket.io-client'; 

const app = createApp(App);


// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;


// Setze die Basis-URL für Axios
Axios.defaults.baseURL = 'http://localhost:3000';

// Global Axios verfügbar machen
app.config.globalProperties.$axios = Axios;

// WebSocket-Verbindung einrichten
const socket = io("http://localhost:3000"); 

// Event-Listener für die WebSocket-Verbindung
socket.on("connect", () => {
    console.log("Mit dem WebSocket-Server verbunden:", socket.id);
});

// Global verfügbar machen (soll in mehreren Komponeten verfügbar sein)
app.config.globalProperties.$socket = socket;

// Beispiel: Empfang von Nachrichten
socket.on("receiveMessage", (data) => {
    console.log("Nachricht vom Server:", data);
});

// Benutze den Router und den Store in der App
app.use(router); // router einbinden
app.use(store); // store einbinden

// App mounten
app.mount('#app');