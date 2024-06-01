import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import createRouter from './router'

const store = createPinia()
const router = createRouter()

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)

app.use(router)
   .use(store)
   .use(vuetify)
   .mount('#app')
