/**
 * 整个项目的接口都在这个文件中进行统一管理
 * 方便后续维护和管理
 * 也可以在这个文件中进行一些公共的接口处理，比如添加请求头、错误处理等
 * 当然也可以根据需要将接口分成多个文件进行管理，比如 homeApi.js、userApi.js 等
 * 这样可以更清晰地组织代码，避免文件过大难以维护
 */
 import { mock } from "mockjs"
import request from "./request.js"

//  全球首页左侧的表格的数据
export default{
    getTableData(){
        return request({
            url: "/api/home/getTableData",
            method: "get",
            mock:true,
        })
    },
      getCountData(){
        return request({
            url: "/api/home/getCountData",
            method: "get",
            mock:true,
        })
    },
    getChartData(){
        return request({
            url: "/api/home/getChartData",
            method: "get",
            mock:true,
        })
    },
    getUserData(data){
        return request({
            url:"/home/getUserData",
            method:"get",
            data,
            mock:true,
        })
    },
    deleteUser(data){
        return request({
            url:"/user/deleteUser",
            method:"get",
            data,
        })
    },
    addUser(data) {
    return request({
      url: '/user/addUser',
      method: 'post',
      data: data
    })
  },
  editUser(data) {
    return request({
      url: '/user/editUser',
      method: 'post',
      data: data
    })
  },
}

