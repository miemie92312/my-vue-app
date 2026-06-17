# my-vue-app

基于 **Vue 3 + Vite + Element Plus** 的商业后台管理系统前端项目，采用 Composition API（`<script setup>`）与 Mock.js 假数据驱动，实现首页数据看板与用户管理两大核心模块。

---

## 🛠️ 技术栈

| 类别 | 技术 |
|---|---|
| 核心框架 | Vue 3 (Composition API, `<script setup>`) |
| 构建工具 | Vite 4 |
| UI 组件库 | Element Plus 2.x |
| 可视化 | ECharts 5.x |
| 路由 | Vue Router 4 (Hash 模式) |
| 状态管理 | Pinia |
| HTTP 请求 | Axios (拦截器封装) |
| Mock 数据 | Mock.js |
| CSS 预处理 | Less |

---

## 📁 项目结构

```
my-vue-app/
├── index.html                    # 入口 HTML
├── vite.config.js                # Vite 配置（别名 @ → /src、Element Plus 按需导入）
├── package.json
└── src/
    ├── main.js                   # 应用入口（挂载 Element Plus、Pinia、Router、全局 $api）
    ├── App.vue                   # 根组件（#app 容器，overflow: hidden）
    ├── assets/
    │   ├── images/               # 静态图片资源
    │   └── less/
    │       ├── index.less        # Less 入口（导入 reset）
    │       └── reset.less        # CSS Reset + html/body 高宽 100% 设置
    ├── config/
    │   └── index.js              # 环境配置中心（dev/test/prod 三套 baseApi + mock 开关）
    ├── router/
    │   └── index.js              # 路由配置（Main 为父路由，Home/User 为子路由）
    ├── stores/
    │   └── index.js              # Pinia Store（侧边栏折叠状态 isCollapse）
    ├── api/
    │   ├── api.js                # 接口统一导出（getTableData / getCountData / getChartData / getUserData / deleteUser / addUser / editUser）
    │   ├── request.js            # Axios 封装（请求/响应拦截器、Mock 智能分流、环境切换）
    │   ├── mock.js               # Mock.js 拦截注册（正则匹配 API 路径）
    │   └── mockDate/
    │       ├── home.js           # 首页 Mock 数据（表格、卡片统计、图表数据）
    │       └── user.js           # 用户管理 Mock 数据（CRUD + 分页 + 搜索）
    ├── components/
    │   ├── CommonAside.vue       # 左侧菜单组件（折叠/展开、多级菜单）
    │   ├── CommonHeader.vue      # 顶部 Header（折叠按钮、面包屑、用户头像下拉）
    │   └── CommonTag.vue         # 页签导航组件（横向滚动标签栏）
    └── views/
        ├── Main.vue              # 主布局框架（Aside + Header + Tag + router-view）
        ├── Home.vue              # 首页数据看板（表格、统计卡片、ECharts 图表）
        └── User.vue              # 用户管理页（CRUD 弹窗表单、分页列表、模糊搜索）
```

---

## 📦 功能模块

### 1. 主布局框架（Main.vue + 三组件）

- **CommonAside**：左侧可折叠菜单，Pinia 驱动折叠状态，支持单级菜单和 `el-sub-menu` 多级分组。
- **CommonHeader**：顶部栏，含折叠按钮、面包屑导航、用户头像下拉菜单。
- **CommonTag**：页签导航栏，`flex-wrap: nowrap` + `overflow-x: auto` 实现横向滚动，防止 tag 过多时折行溢出。

### 2. 首页数据看板（Home.vue）

- **左侧（span="8"）**：
  - 用户信息卡片（Vite 动态图片加载 `new URL(..., import.meta.url).href`）
  - 品牌销售数据表格（`el-table` + `v-for` 动态列映射）
- **右侧（span="16"）**：
  - 6 个统计指标卡片（`<component :is="item.icon">` 动态图标 + `:style` 动态背景色）
  - **多品牌折线图**：`Object.keys()` 动态提取多品牌销量数据，渲染多条折线
  - **双柱状图**：新增用户 vs 活跃用户对比
  - **饼状图**：手机品牌销量占比
  - `ResizeObserver` 监听容器尺寸变化，自动调用 `echarts.resize()`

### 3. 用户管理（User.vue）

- 列表展示（姓名、年龄、性别、出生日期、地址）
- **新增 / 编辑**：弹窗表单（`el-dialog` + `el-form`），含表单验证规则
- **删除**：`ElMessageBox.confirm` 二次确认
- **搜索**：按姓名模糊筛选
- **分页**：`el-pagination` 分页器

### 4. API 层架构

```
View → proxy.$api.xxx() → api.js → request.js → Axios
                                                  ├── Mock 开启 → mockApi (Mock.js 拦截)
                                                  └── Mock 关闭 → baseApi (真实后端)
```

- `config/index.js`：根据 `import.meta.env.MODE` 自动切换 dev/test/prod 环境配置
- `request.js`：响应拦截器自动解包 `code === 200` 的 `data`，非 200 弹出 `ElMessage.error`
- `mock.js`：使用正则匹配拦截 API 路径，分发到对应 Mock 模块
- `api.js`：统一导出所有接口方法，通过 `app.config.globalProperties.$api` 全局注入

---

## 🚀 运行

```bash
# 安装依赖
npm install

# 开发模式（Mock 数据，无需后端）
npm run dev

# 构建生产
npm run build

# 预览构建结果
npm run preview
```

---

## ⚠️ 排坑记录

| # | 问题 | 原因 | 解决 |
|---|---|---|---|
| 1 | 模板编译报错 `Element is missing end tag` | `<component:is="...">` 缺少空格，Vue 将其解析为未知标签 | 改为 `<component :is="...">` |
| 2 | ECharts 报 `ReferenceError: data is not defined` | 解构了 `orderData` 但打印了 `console.log(data)` | 保持变量引用一致，删多余 `echarts.init` |
| 3 | 柱状图 X 轴全显示 `undefined` | 将 Mock 的 `item.date` 误写为 `item.data` | 改为 `userData.map(item => item.date)` |
| 4 | Mock 修改后页面不更新 / 报 no data | Vite HMR 无法渗透 MockJS 内存缓存，语法错导致模块崩溃 | `Ctrl+C` 停服 → `npm run dev` 冷启动 |
| 5 | `proxy.$api.getUserData is not a function` | 方法写在了 `export default {}` 大括号外 | 移入导出对象内，补全 URL 前缀 `/api` |
| 6 | countData 卡片不显示且样式错乱 | 动态组件标签粘连 + Flex 布局未生效 | 修正 `<component :is>` 语法，补全 `.num` 的 flex-wrap 排版 |
| 7 | Tag 溢出折行，加 `overflow` 无效 | 仅加 `overflow-x: auto` 但未禁止 flex 换行 | 同时设置 `display: flex; flex-wrap: nowrap; overflow-x: auto; flex-shrink: 0` |
