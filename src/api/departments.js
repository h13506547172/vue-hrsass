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
 * 新增部门的方法
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

/**
 * 根据id获取部门详情
 * @param {*} id 
 * @returns 
 */
export function getDepartmentInfoAPI(id) {
  return request({
    url: '/company/department/' + id,
    method: 'GET',
  })
}

/**
 * 编辑部门详情
 * @param {*} id 
 * @returns 
 */
 export function editDepartmentInfoAPI(id,data) {
  return request({
    url: '/company/department/' + id,
    method: 'PUT',
    data
  })
}
