import request from '@/utils/request'

export function loginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户基本信息的api
export function getUserInfoAPI() {
  return request({
    url: '/sys/profile',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 获取用户详细信息的api
export function getUserMoreInfoAPI(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'GET',
  })
}
