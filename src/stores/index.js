import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    currentMenu:null
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


      //需要把所有定义的state，getters，actions返回出去
      return {
        state,
        selectMenu,
        updateTags,
      }
})