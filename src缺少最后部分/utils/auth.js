import Cookies from 'js-cookie'
// 封装了cookies的处理方法
const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 存储token时间戳 判断用户token是否过期
export function setTokenTime(time) {
  return Cookies.set('TokenTime', time)
}
// 获取token时间戳
export function getTokenTime() {
  return Cookies.get('TokenTime')
}