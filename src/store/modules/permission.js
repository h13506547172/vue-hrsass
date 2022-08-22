import router, { constantRoutes } from '@/router/index'
import { asyncRoutes } from '@/router/index'

export default {
  namespaced: true,
  state: {
    routers: [], // 自己定义的所有有权限的路由规则
    points: [] // 按钮权限
  },
  mutations: {
    setRouters(state, dynamicRouters) {
      state.routers = [...constantRoutes, ...dynamicRouters]
      // console.log(state.routers)
    },
    setPoints(state,data) {
      state.points = data
    }
  },
  actions: {
    asyncSetRouters(context, roles) {
      // 这里的res需要actions中return数据出来
      // console.log(roles)
      // 将roles中的menus和动态路由meta.id来进行对比
      const dynamicRouters = asyncRoutes.filter((item) => {
        return roles.menus.includes(item.meta?.id)
      })
      context.commit('setRouters', dynamicRouters)
      // 动态添加路由
      router.addRoutes([
        ...dynamicRouters,
        // 404 page must be placed at the end !!!
        { path: '*', redirect: '/404', hidden: true }
      ])
    },
    asyncSetPoints(context, points) {
      context.commit('setPoints', points)
    }
  },
  getters: {}
}
