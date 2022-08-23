// 员工
import request from '@/utils/request'
// 获取部分员工的数据
export function getEmployeesAPI() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
/**
 * 获取员工信息列表
 * @param {*} params { page: 1 size: 10}
 * @returns
 */
export function getEmployeesListAPI(params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

/**
 * 删除员工接口
 * ****/
export function delEmployeeAPI(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/** **
 *  新增员工的接口
 * **/
export function addEmployeeAPI(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

export function batchAddEmployeeAPI(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}

//  保存员工基本信息 
export function saveEmployeeInfoAPI(id,data) {
  return request({
    method: 'PUT',
    url: `/sys/user/${id}`,
    data
  })
}

// 获取员工个人信息 /employees/{id}/personalInfo
export function getEmployeesPersonalInfoAPI(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'GET'
  })
}
// 保存员工个人信息 /employees/{id}/personalInfo
export function saveEmployeePersonalInfoAPI(id,data) {
  return request({
    method: 'PUT',
    url: `/employees/${id}/personalInfo`,
    data
  })
}