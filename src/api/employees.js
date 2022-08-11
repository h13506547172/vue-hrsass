// 员工
import request from '@/utils/request'
// 获取部分员工的数据
export function getEmployeesAPI() {
  return request({
    url: '/sys/user/simple',
    method: 'GET',
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