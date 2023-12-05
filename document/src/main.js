import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import 'foxyjs/style.css'
import i18n from './locales/index'
const app = createApp(App)
app.use(i18n)
app.use(router).mount('#app')
