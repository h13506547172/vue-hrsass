import request from '@/utils/request'
// 获取组织架构
export function getDepartmentAPI() {
  return request({
    url: '/company/department',
    method: 'GET',
  })
}
/**
 * 
 * @param {*} 删除的部门id
 * @returns promise
 */
export function removeDepartmentAPI(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE',
  })
}
