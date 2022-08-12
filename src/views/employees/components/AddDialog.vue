<template>
  <el-dialog title="提示" :visible="addDialogShow" width="50%" @close="closeFn">
    <!-- 表单 -->
    <el-form :model="formData" :rules="rules" label-width="120px" ref="addForm">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          ref="treeSclect"
          v-model="formData.departmentName"
          placeholder="请选择"
          @focus="getDepartment"
        >
          <el-option value="" class="treeOption">
            <el-tree
              @node-click="nodeClickFn"
              v-loading="treeloading"
              :data="departmentsData"
              :props="treeProps"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="closeFn">取消</el-button>
          <el-button type="primary" size="small" @click="confirmAddFn"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/constant/employees'
import { getDepartmentAPI } from '@/api/departments'
import { dataToTress } from '@/utils/index'
import { addEmployeeAPI } from '@/api/employees'
export default {
  props: {
    addDialogShow: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      EmployeeEnum, // 在data中定义数据
      // 表单数据
      treeData: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间', trigger: 'change' }
        ]
      },
      // 新增表单选择部门
      departmentsData: [],
      treeProps: {
        label: 'name'
      },
      treeloading: false
    }
  },

  created() {},

  methods: {
    // 获取组织架构数据
    async getDepartment() {
      this.treeloading = true
      const { depts } = await getDepartmentAPI()
      this.departmentsData = dataToTress(depts, '')
      this.treeloading = false
    },
    // 点击节点时选中某项并关闭选择框
    nodeClickFn(row) {
      // console.log(row)
      this.formData.departmentName = row.name
      this.$refs.treeSclect.blur()
    },
    closeFn() {
      this.$emit('update:addDialogShow', false)
      this.$refs.addForm.resetFields()
    },
    // 确认新增事件
    confirmAddFn() {
      this.$refs.addForm.validate(async (isThrough) => {
        // 表单校验不通过
        if (!isThrough) return
        await addEmployeeAPI(this.formData)
        this.closeFn()
        this.$message.success('添加成功')
        this.$parent.getEmployeesList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
}
.treeOption {
  height: 100px;
  overflow: unset;
}
</style>
