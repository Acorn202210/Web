import { createApp } from 'vue'
import App from './App.vue'

let app = createApp(App)

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import router from './router.js'
import store from './store/store.js'

app.use(store).use(router).mount('#app')
