import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from "./modules/permission";
// 持久化存储
import createVuexPersisted from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters,
  plugins: [
    // 默认是所有vuex模块中的state的值存入本地
    createVuexPersisted({
      reducer(state) {
        return {
          user: {
            token: state.user.token
          }
        }
      }
    })
  ]
})

export default store
