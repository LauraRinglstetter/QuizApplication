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
Axios.defaults.baseURL = process.env.VUE_APP_API_BASE;

// Global Axios verfügbar machen
app.config.globalProperties.$axios = Axios;

// WebSocket-Verbindung
const socket = io(process.env.VUE_APP_SOCKET_URL, {
    transports: ['websocket'],
    withCredentials: true
  });


// Global verfügbar machen (soll in mehreren Komponeten verfügbar sein)
app.config.globalProperties.$socket = socket;

// Benutze den Router und den Store in der App
app.use(router); // router einbinden
app.use(store); // store einbinden

// App mounten
app.mount('#app');

export { socket };