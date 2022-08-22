import { loginAPI, getUserInfoAPI, getUserMoreInfoAPI } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router/index'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, data) {
      state.token = data
    },
    setUserInfo(state, data) {
      state.userInfo = data
    }
  },
  actions: {
    async asyncSetToken(context, data) {
      // 发送请求获取token
      const restoken = await loginAPI(data)
      const token = restoken
      context.commit('setToken', token)
      // 存储token时间戳
      setTokenTime(Date.now())
    },
    async asyncSetUserInfo(context) {
      // 获取用户的基本和详细数据，并合并
      const res = await getUserInfoAPI()
      const res2 = await getUserMoreInfoAPI(res.userId)
      context.commit('setUserInfo', { ...res, ...res2 })
      // actions中可以return数据出去，结果是一个promise
      return res
    },
    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 重置路由
      resetRouter()
      // 清空vuex中的动态路由数据
      context.commit('permission/setRouters', [], { root: true })
    }
  },
  getters: {}
}
