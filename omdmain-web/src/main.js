import './assets/main.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//默认导入router/index.js文件
//import router from '@/router'
import router from '@/router/router.js'
import App from './App.vue'
import { createPinia } from 'pinia'
//导入持久化插件
import {createPersistedState} from 'pinia-persistedstate-plugin'
//导入国际化
import locale from 'element-plus/dist/locale/zh-cn.js'

const pinia = createPinia()
const persist = createPersistedState()
const app = createApp(App)

//pinia使用持久化插件
pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(ElementPlus,{locale})

app.mount('#app')