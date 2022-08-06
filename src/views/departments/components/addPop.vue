<template>
  <el-dialog
    :title="popTitle"
    :visible="dialogVisible"
    width="50%"
    @close="onClose"
  >
    <el-form ref="form" label-width="100px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="请输入部门名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="请输入部门编码"
          v-model="formData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择部门负责人"
          style="width: 100%"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="100-300字"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDepartmentAPI,
  addDepartmentAPI,
  getDepartmentInfoAPI,
  editDepartmentInfoAPI
} from '@/api/departments'
import { getEmployeesAPI } from '@/api/employees'
export default {
  computed: {
    popTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    }
  },
  props: {
    // 控制弹出层显示和隐藏
    dialogVisible: {
      type: Boolean,
      required: true
    },
    curNode: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 表单数据
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      // 员工列表
      employees: [],
      // 表单校验
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: async (rule, value, callback) => {
              // 判断是编辑还是添加部门
              if (this.formData.id) {
                const { depts } = await getDepartmentAPI()
                // console.log(depts)
                const filterArr = depts.filter(
                  (item) =>
                    item.pid == this.formData.pid &&
                    item.id !== this.formData.id
                )
                // console.log(filterArr)
                const boolean = filterArr.some(
                  (item) => item.name === this.formData.name
                )
                boolean ? callback(new Error('部门重复')) : callback()
              } else {
                if (!this.curNode.children) return callback()
                // 判断子部门是否存在
                const boolean = this.curNode.children.some(
                  (item) => item.name === value
                )
                boolean ? callback(new Error('部门重复')) : callback()
              }
            },
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: async (rule, value, callback) => {
              // 判断部门编号是否重复
              const { depts } = await getDepartmentAPI()
              // console.log(depts)
              let boolean
              // 如果id存在就是编辑
              if (this.formData.id) {
                const depts1 = depts.filter((item) => item.id !== this.formData.id)
                boolean = depts1.some((item) => item.code === value)
              } else {
                boolean = depts.some((item) => item.code === value)
              }

              boolean ? callback(new Error('部门编码重复')) : callback()
            },
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    // 获取员工数据
    this.getEmployees()
  },

  methods: {
    async getEmployees() {
      const res = await getEmployeesAPI()
      // console.log(res)
      this.employees = res
    },
    // 关闭弹窗的函数
    onClose() {
      // console.log(111)
      // 并清空添加面板
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$emit('updata', false)
    },
    // 按下确定时触发的函数
    async onSave() {
      await this.$refs.form.validate()
      // 判断是添加还是编辑
      if (this.formData.id) {
        await editDepartmentInfoAPI(this.formData.id, this.formData)
        this.onClose()
        this.$message.success('添加部门成功')
        this.$emit('success')
        return
      }
      this.formData.pid = this.curNode.id
      // console.log(this.formData)
      try {
        await addDepartmentAPI(this.formData)
        this.onClose()
        this.$message.success('添加部门成功')
        this.$emit('success')
        // 添加成功刷新数据，并清空添加面板
        this.$refs.form.resetFields()
        this.formData = {
          name: '',
          code: '',
          manager: '',
          introduce: ''
        }
      } catch (error) {
        this.$message.error('修改部门失败')
      }
    },
    // 点击编辑时触发函数获取id
    async getDeptById(id) {
      // console.log(id)
      this.formData = await getDepartmentInfoAPI(id)
    }
  }
}
</script>

<style lang="less" scoped></style>
