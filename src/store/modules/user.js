import { loginAPI } from "@/api/user";
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state,data) {
      state.token = data
    }
  },
  actions: {
    async asyncSetToken(context, data) {
      try {
        // 发送请求获取token
        const restoken = await loginAPI(data)
        const token = restoken
        context.commit('setToken', token)
      } catch (error) {
        console.log(error);
      }
      
    }
  },
  getters: {

  }
}
