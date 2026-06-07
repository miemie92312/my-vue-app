import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/less/index.less"
import router from "@/router/index.js"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
// 开发环境下引入 mock 数据
import "@/api/mock.js"
import api from "@/api/api.js"
import { reactive } from 'vue'
import * as echarts from 'echarts'



const app = createApp(App)
app.config.globalProperties.$api = api
app.use(router)
app.use(ElementPlus)
app.use(createPinia())
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}