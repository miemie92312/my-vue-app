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
import { useAllDataStore } from "@/stores"
// import { useAllDataStore } from './stores/index.js'
// import { refresh } from 'less'
import Login from './views/Login.vue'
function isRoute(to){
  return router,getRouters().filter(item=>item.path === to.path).lenth > 0
}
router.beforeEach((to,from)=>{
  if(to.path !=='/login' && !store.state.token){
    return { name:"login" }
  }
})

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$api = api

app.use(pinia)
app.use(ElementPlus)

const store = useAllDataStore()
store.addMenu(router,"refresh")
app.use(router)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}