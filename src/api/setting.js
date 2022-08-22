// 公司设置
import request from '@/utils/request'
// 获取所有角色列表 /sys/role
export function getSysRoleAPI(page, pagesize) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params: {
      page,
      pagesize
    }
  })
}
/**
 * 添加角色
 * @param {*} data name region
 * @returns
 */
export function addSysRoleAPI(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
// 根据id查询企业
export function getCompanyInfoAPI(id) {
  return request({
    url: '/company/' + id,
    method: 'GET'
  })
}
// 根据id获取角色权限  /sys/role/{id}
export function getSysRoleByidAPI(id) {
  return request({
    url: '/sys/role/' + id
  })
}
// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
// 添加权限点 /sys/permission
export function addpermissionAPI(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}