import axios from "axios"
import { ElMessage } from "element-plus"
import config from "@/config"
import { useAllDataStore } from "@/stores"

const service = axios.create()
const NETWORK_ERROR = "网络请求异常，请稍后重试"

service.interceptors.request.use(
  (requestConfig) => {
    const store = useAllDataStore()
    const token = store.state.token

    if (token) {
      requestConfig.headers = requestConfig.headers || {}
      requestConfig.headers.Authorization = `Bearer ${token}`
    }

    return requestConfig
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (res) => {
    const { code, data, msg } = res.data

    if (code === 200) {
      return data
    }

    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(new Error(msg || NETWORK_ERROR))
  },
  (error) => {
    ElMessage.error(error.message || NETWORK_ERROR)
    return Promise.reject(error)
  }
)

function request(options) {
  options.method = options.method || "get"

  if (options.method.toLowerCase() === "get") {
    options.params = options.data
  }

  let isMock = config.mock
  if (typeof options.mock !== "undefined") {
    isMock = options.mock
  }

  if (config.env === "prod") {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(options)
}

export default request