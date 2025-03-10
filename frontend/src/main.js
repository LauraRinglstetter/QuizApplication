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


// Global verfügbar machen (soll in mehreren Komponeten verfügbar sein)
app.config.globalProperties.$socket = socket;

// Benutze den Router und den Store in der App
app.use(router); // router einbinden
app.use(store); // store einbinden

// App mounten
app.mount('#app');

export { socket };