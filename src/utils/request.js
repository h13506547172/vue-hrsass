import axios from 'axios'
// 单独引入element的消息提示
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// request interceptor
service.interceptors.request.use()

// response interceptor
service.interceptors.response.use(
  function (res) {
    const { message, data, success } = res.data
    if (success) {
      return data
    }
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
