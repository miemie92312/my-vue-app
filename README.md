# Vue 后台管理系统

基于 Vue 3 + Vite + Element Plus 开发的通用后台管理系统前端项目，包含登录鉴权、动态权限菜单、首页数据看板和用户管理 CRUD 等模块。项目使用 Mock.js 提供本地接口数据，便于在无后端服务的情况下完成前端功能开发和演示。

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 核心框架 | Vue 3, Composition API, `<script setup>` |
| 构建工具 | Vite 4 |
| UI 组件库 | Element Plus |
| 路由 | Vue Router 4 |
| 状态管理 | Pinia |
| 网络请求 | Axios |
| 数据可视化 | ECharts |
| Mock 数据 | Mock.js |
| 样式 | Less |

## 核心功能

- 登录鉴权：登录接口返回 token 和权限菜单，前端保存登录状态并跳转首页。
- 动态权限路由：根据接口返回的 `menuList` 动态生成菜单，并通过 `router.addRoute` 注册子路由。
- 路由守卫：未登录访问业务页面时跳转登录页，未知路由跳转 404 页面。
- 状态持久化：使用 Pinia 管理 token、菜单、标签页和侧边栏折叠状态，并通过 localStorage 支持刷新恢复。
- 请求封装：基于 Axios 封装统一请求方法，支持环境 baseURL 切换、Mock/真实接口切换、token 自动携带、响应数据脱壳和错误提示。
- 数据看板：使用 ECharts 展示品牌销量趋势、用户增长对比和销量占比，并通过 ResizeObserver 适配容器尺寸变化。
- 用户管理：基于 Element Plus 实现用户列表、搜索、分页、新增、编辑、删除、弹窗表单和表单校验。

## 项目结构

```text
my-vue-app/
├─ index.html
├─ vite.config.js
├─ package.json
└─ src/
   ├─ main.js                  # 应用入口，注册 Pinia、Router、Element Plus 和全局 API
   ├─ App.vue
   ├─ api/
   │  ├─ api.js                # 业务接口统一导出
   │  ├─ request.js            # Axios 请求封装
   │  ├─ mock.js               # Mock 接口注册
   │  └─ mockDate/             # 首页、用户、权限菜单 Mock 数据
   ├─ assets/                  # 图片与 Less 样式资源
   ├─ components/
   │  ├─ CommonAside.vue       # 侧边栏菜单
   │  ├─ CommonHeader.vue      # 顶部栏
   │  └─ CommonTag.vue         # 标签页导航
   ├─ config/
   │  └─ index.js              # 环境和接口配置
   ├─ router/
   │  └─ index.js              # 基础路由配置
   ├─ stores/
   │  └─ index.js              # Pinia 状态管理
   └─ views/
      ├─ Login.vue             # 登录页
      ├─ Main.vue              # 后台主布局
      ├─ Home.vue              # 首页数据看板
      ├─ User.vue              # 用户管理
      ├─ Mall.vue
      └─ 404.vue
```

## 运行方式

```bash
npm install
npm run dev
```

构建生产包：

```bash
npm run build
```

预览构建结果：

```bash
npm run preview
```

## 测试账号

| 角色 | 账号 | 密码 | 权限 |
| --- | --- | --- | --- |
| 管理员 | `admin` | `123456` | 首页、商品管理、用户管理、其他菜单 |
| 普通用户 | `xiaoxiao` | `xiaoxiao` | 首页、用户管理 |

## 构建结果

当前项目已通过 `npm run build` 构建验证。