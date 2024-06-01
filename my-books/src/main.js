import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import createRouter from './router'

const store = createPinia()
const router = createRouter()

const app = createApp(App)

app.use(router).use(store).mount('#app')
