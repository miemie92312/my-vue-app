import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'
import { watch } from 'vue'

//初始化state数据，这里我们使用一个函数来返回
function initState(){
  return {
    isCollapse: false,
    tags:[
        {
            path:'/home',
            name:'home',
            label:'首页',
            icon:"home"
        }
    ],
    currentMenu:null,
    menuList: [],
    token:'',
    routerList:[],

  }
}

//第一个参数要求是一个独一无二的名字
//第二个参数可接受两类值：Setup 函数或 Option 对象。
export const useAllDataStore = defineStore('allData', () => {
   	  //在 Setup Store 中：
      //ref() 就是 state 属性
	  //computed() 就是 getters
	  //function() 就是 actions	
      const state=ref(initState())

      watch(state,(newObj)=>{
        if(!newObj.token) return;
        localStorage.setItem("store",JSON.stringify(newObj))
      },
      {deep:true}
    )
      function selectMenu(val){ 
      if(val.name ==="home"){
        state.value.currentMenu = null 
        }else{
        let index =  state.value.tags.findIndex(item=>item.name ===val.name)
        index === -1? state.value.tags.push(val) : " ";
        }
      };

      function updateTags(tag){
        let index = state.value.tags.findIndex(item=>item.name === tag.name)
        state.value.tags.splice(index,1)
      }
      
      function resetState() {
         state.value = initState()
      }

      function addMenu(router,type){
        if(type === 'refresh'){
          if(JSON.parse(localStorage.getItem('store'))){
            state.value = JSON.parse(localStorage.getItem('store'))
            //
            state.value.routerList = []
          }else{
            return
          }
        }
        const menu = state.value.menuList;
        const module = import.meta.glob('../views/**/*.vue');
        //定义菜单格式化后的路由数组
        const routeArr = []
        //格式化菜单
        menu.forEach(item=>{
          //菜单有children
          if(item.children){
            item.children.forEach(val=>{
              let url = `../views/${val.url}.vue`
              val.component = module[url]
            })
            routeArr.push(...item.children)
          }else{
            let url =`../views/${item.url}.vue`
            item.component = module[url]
            routeArr.push(item)
          }
        })

        // 旧写法保留：state.value.routerList = []

        // 先把上一次动态添加的路由删除掉，避免切换用户后旧权限残留
        state.value.routerList.forEach(removeRoute => removeRoute())
        state.value.routerList = []

        routeArr.forEach(item=>{
          state.value.routerList.push(router.addRoute('main',item))
        })
      }

      function updateMenuList(val){
        state.value.menuList = val
      }

      //需要把所有定义的state，getters，actions返回出去
      return {
        state,
        selectMenu,
        updateTags,
        updateMenuList,
        addMenu,
        resetState,
      }
})