import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import './assets/main.scss';

/**
 * The Vue application instance.
 */
const app = createApp(App);

app.use(createPinia());

app.mount('#app');
