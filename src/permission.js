// 登录权限的代码区域
import router from '@/router/index'
// import { asyncRoutes } from '@/router/index'
// console.log(asyncRoutes)
import store from '@/store/index'
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  // 如果已登录
  if (store.state.user.token) {
    // 获取用户信息，并且不需要持久化,有数据就不请求
    if (!store.state.user.userInfo.userId) {
      // 要先获取数据，否则可能导致后面依赖这个数据的请求出错
      const { roles } = await store.dispatch('user/asyncSetUserInfo')
      await store.dispatch('permission/asyncSetRouters', roles)
      // 按钮权限
      await store.dispatch('permission/asyncSetPoints', roles.points)
      return next(to.path) // 第一次进入页面，路由还没生成，要再次触发路由守卫
    }
    // 去登录页面跳首页
    if (to.path === '/login') return next('/')
    // 不是就正常跳转
    return next()
  } else {
    // 未登录,前往白名单页面
    if (whiteList.includes(to.path)) return next()
    // 非白名单前往登录页面
    return next('/login')
  }
})
