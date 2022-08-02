import { loginAPI, getUserInfoAPI, getUserMoreInfoAPI } from '@/api/user'
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
    },
    async asyncSetUserInfo(context) {
      // 获取用户的基本和详细数据，并合并
      const res = await getUserInfoAPI()
      const res2 = await getUserMoreInfoAPI(res.userId)
      // console.log(res)
      // console.log(res2)
      context.commit('setUserInfo', { ...res, ...res2 })
    }
  },
  getters: {}
}
