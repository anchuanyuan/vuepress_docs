import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'

import ids from 'virtual:svg-icons-names'
const app = createApp(App)

console.log({ ids })
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('svg-icon', SvgIcon)
app.mount('#app')
