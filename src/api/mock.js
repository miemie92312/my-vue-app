import Mock from "mockjs"
import homeApi from "./mockDate/home"
import userApi from "./mockDate/user"
// 1 拦截的路径 2 方法 3 制造出的假数据

Mock.mock(/api\/home\/getTableData/, "get", homeApi.getTableData)
Mock.mock(/api\/home\/getCountData/, "get", homeApi.getCountData)
Mock.mock(/api\/home\/getChartData/, "get", homeApi.getChartData)
Mock.mock(/api\/home\/getUserData/, "get", userApi.getUserList)
Mock.mock(/user\/deleteUser/, "get", userApi.deleteUser)
Mock.mock(/user\/addUser/,"post", userApi.createUser)
Mock.mock(/user\/editUser/, "post",userApi.updateUser)
Mock.mock(/user\/getMenu/, "post", userApi.getMenu)