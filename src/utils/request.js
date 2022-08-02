import axios from 'axios'
import store from "@/store/index";
// 单独引入element的消息提示
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前如果token存在就添加请求头
  if (store.state.user.token) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  //config是本次请求的请求配置对象,一定要返回
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});




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
  function (error) {
    // 对响应错误做点什么
    Message.error('系统错误，请稍后再试')
    return Promise.reject(error)
  }
)

export default service
