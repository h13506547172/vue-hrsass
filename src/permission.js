// 登录权限的代码区域
import router from '@/router/index'
import store from "@/store/index";
const whiteList = ['/login' , '/404']
router.beforeEach((to, from, next) => {
  // 如果已登录
  if (store.state.user.token) {
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