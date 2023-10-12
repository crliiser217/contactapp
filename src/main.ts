import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import VueTheMask from 'vue-the-mask'


const pinia = createPinia()

createApp(App).use(pinia).use(VueTheMask).mount('#app')
