import { createApp } from 'vue'
import App from './App.vue'

let app = createApp(App)

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

require('./assets/css/main_nav.css')
require('./assets/css/style.css')

import router from './router.js'
import store from './store/store.js'

app.use(store).use(router).mount('#app')


