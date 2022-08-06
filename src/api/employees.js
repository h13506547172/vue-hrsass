// 员工
import request from '@/utils/request'
// 获取员工的数据
export function getEmployeesAPI() {
  return request({
    url: '/sys/user/simple',
    method: 'GET',
  })
}
// 添加员工