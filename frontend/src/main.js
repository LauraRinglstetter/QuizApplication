import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';

const app = createApp(App);


// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

// Benutze den Router und den Store in der App
app.use(router); // router einbinden
app.use(store); // store einbinden

// App mounten
app.mount('#app');