
const env = import.meta.env.MODE || "prod"
const EnvConfig = {
    development: {
        baseApi: "/api",
        mockApi: "https://www.fastmock.site/mock/1c8b9e7a3d2c0e5f1b8c9e8a1b2c3d4/api"
    },
    test: {
        baseApi: "//test.futrue.com/api",
        mockApi: "https://www.fastmock.site/mock/1c8b9e7a3d2c0e5f1b8c9e8a1b2c3d4/api"
    },
    prod: {
        baseApi: "//futrue.com/api",
        mockApi: "https://www.fastmock.site/mock/1c8b9e7a3d2c0e5f1b8c9e8a1b2c3d4/api"
    }
}


export default {
    env,           // 抛出当前环境（比如 'development'）
    mock: true,    // 全局控制是否开启 mock 假数据
    ...EnvConfig[env]  // 🌟 重点：只把当前环境（开发环境）里面的 baseApi 等解构出来！
}