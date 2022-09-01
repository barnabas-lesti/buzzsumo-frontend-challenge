import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './i18n';
import router from './router';
import App from './app.vue';
import './assets/main.scss';

/**
 * The Vue application instance.
 */
const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(createPinia());

app.mount('#app');
