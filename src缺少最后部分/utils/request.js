import axios from 'axios'
import store from '@/store/index'
// 单独引入element的消息提示
import { Message } from 'element-ui'
// 引入cookies方法
import { getTokenTime } from './auth'
// 引入router实例
import router from "../router/index";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
// token是否过期
const timeOut = () => {
  const tokenTime = getTokenTime()
  const nowTime = Date.now()
  return nowTime - tokenTime > 7200 * 1000
}
// 添加请求拦截器
service.interceptors.request.use(
  async function (config) {
    // 在发送请求之前如果token存在就添加请求头
    if (store.state.user.token) {
      //如果token过期就跳转登录
      if (timeOut()) {
        // 跳转到登录页
        await store.dispatch('user/logout')
        router.push('/login')
        // 返回一个错误对象
        return Promise.reject(new Error('登录过期'))
      } else {
        config.headers.Authorization = 'Bearer ' + store.state.user.token
      }
    }
    //config是本次请求的请求配置对象,一定要返回
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  function (res) {
    // 对返回的数据进行处理如果成功就返回数据
    const { message, data, success } = res.data
    if (success) {
      return data
    }
    // 失败就抛出错误
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    // 后端判断token过期的情况
    if (error.response?.status === 401) {
      // 跳转到登录页
      await store.dispatch('user/logout')
      router.push('/login')
      Message.error('登录过期，请重新登录')
    } else {
      Message.error(error.message)
      
    }
    
    return Promise.reject(error)
  }
)

export default service
