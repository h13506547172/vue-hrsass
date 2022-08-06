import request from '@/utils/request'
// 获取组织架构的数据
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
/**
 * 
 * @param {*} data name code manager introduce pid
 * @returns 
 */
 export function addDepartmentAPI(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
