import svgIcon from '@/components/SvgIcon/index.vue'
import i18n from '@/locales/i18n'
import * as THREE from 'three'
import { createApp } from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import App from './App.vue'
import './style.css'
import './style/markdown.css'
import './style/style.scss'
import 'virtual:svg-icons-register'
import router from '@/router'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)

app.config.globalProperties.$THREE = THREE
app.component('svg-icon', svgIcon)
app.use(router).use(VueDOMPurifyHTML).use(pinia).use(i18n).mount('#app')
