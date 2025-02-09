import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import { createPinia} from "pinia";

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(PrimeVue);
app.mount('#app')
