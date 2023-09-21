// 样式全局使⽤
import 'vant/lib/index.css'
import './styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia().use(persist))
app.use(router)

app.mount('#app')
