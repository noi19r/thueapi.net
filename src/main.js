import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import globalComponents from './global-components'
import toast from './plugins/toast'
import utils from './utils'
import './assets/css/app.css'

import 'mosha-vue-toastify/dist/style.css'

const app = createApp(App).use(router).use(createPinia()).use(toast)

globalComponents(app)
utils(app)

app.mount('#app')
