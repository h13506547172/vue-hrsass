// 权限
import request from '@/utils/request'
// 获取权限
export function getPermissionListAPI(params) {
  return request({
    url: '/sys/permission',
    params
  })
}