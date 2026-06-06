import { defineStore } from 'pinia'
import { ref } from 'vue'

//初始化state数据，这里我们使用一个函数来返回
function initState(){
  return {
    isCollapse: false,
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



      //需要把所有定义的state，getters，actions返回出去
      return {
        state
      }
})