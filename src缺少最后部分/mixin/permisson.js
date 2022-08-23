// 按钮权限映射表
import permission from '@/constant/permission'
const { btnMapPermission,roles } = permission
export default {
  data() {
    return {
      btnMapPermission,
      roles
    }
  },
  methods: {
    // 员工按钮权限方法
    isDisabled(btnName) {
      return this.$store.state.permission.points.includes(btnName)
    }
  }
}
