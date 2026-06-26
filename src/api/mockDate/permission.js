import Mock from 'mockjs'
export default {
  getMenu: config => {
    // 1. 拆开前端寄过来的包裹，拿出账号和密码
    const { username, password } = JSON.parse(config.body)
    
    // 2. 严密审核！看是不是管理员来了
    if (username === 'admin' && password === '123456') {
      return {
        code: 200, // 200 代表成功
        data: {
          // 发放通行证 Token
          token: 'super-admin-fake-token',
          message: '登录成功',
          // 发放专属菜单（静态数据搬家到这里了！）
          menuList: [
            { path: '/home', name: 'home', label: '首页', icon: 'house', url: 'Home' },
            { path: '/mall', name: 'mall', label: '商品管理', icon: 'video-play', url: 'Mall' },
            { path: '/user', name: 'user', label: '用户管理', icon: 'user', url: 'User' },
            {
              path: 'other', label: '其他', icon: 'location',
              children: [
                { path: '/page1', name: 'page1', label: '页面1', icon: 'setting', url: 'Page1' },
                { path: '/page2', name: 'page2', label: '页面2', icon: 'setting', url: 'Page2' }
              ]
            }
          ]
        }
      }
    // 旧写法保留思路：这里原来直接进入账号密码错误分支
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 200,
        data: {
          // 普通用户只给基础菜单权限
          token: Mock.Random.guid(),
          message: '登录成功',
          menuList: [
            { path: '/home', name: 'home', label: '首页', icon: 'house', url: 'Home' },
            { path: '/user', name: 'user', label: '用户管理', icon: 'user', url: 'User' }
          ]
        }
      }
    } else {
      // 如果账号密码不对，直接打回票！
      return {
        code: 999, // 错误码
        data: { message: '账号或密码错误！' }
      }
    }
  }
}