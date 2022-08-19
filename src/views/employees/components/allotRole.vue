<template>
  <el-dialog
    title="分配角色"
    :visible="allotRoleShow"
    width="40%"
    @close="closeFn"
    @open="getSysRole"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFn">取 消</el-button>
      <el-button type="primary" @click="assignPrem">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSysRoleAPI } from '@/api/setting'
import { assignRolesAPI } from '@/api/user'
export default {
  name: 'allotRole',
  props: {
    allotRoleShow: {
      type: Boolean,
      required: true
    },
    roleIds: {
      type: Array,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      checkList: [],
      list: []
    }
  },

  created() {},

  methods: {
    closeFn() {
      this.$emit('update:allotRoleShow', false)
    },
    // open获取数据
    async getSysRole() {
      const data = await getSysRoleAPI(1, 999)
      this.list = data.rows
      this.checkList = this.roleIds
    },
    async assignPrem() {
      if (this.checkList.length === 0) return this.$message.error('请选择角色')
      await assignRolesAPI(this.userId, this.checkList)
      this.$message.success('分配成功')
      this.closeFn()
    }
  }
}
</script>

<style lang="less" scoped></style>
