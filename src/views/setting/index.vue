<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <!-- 角色管理tab页面 -->
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addDialogVisible = true"
            >新增角色</el-button
          >
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="角色"
              width="240"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="description"
              label="描述"
              width="450"
            >
            </el-table-column>
            <el-table-column align="center" label="操作" width="450">
              <el-button size="small" type="success">分配权限</el-button>
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small" type="danger">删除</el-button>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :page-size="this.pagesize"
            :page-sizes="[2, 5, 10, 20]"
            layout="sizes,prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </el-tab-pane>
        <!-- 公司信息tab页面 -->
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" :model="companyInfo" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="companyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 新增的对话框 -->
      <el-dialog
        @close="closeAdd"
        title="编辑角色"
        :visible.sync="addDialogVisible"
        width="50%"
      >
        <el-form
          ref="form"
          :model="addForm"
          :rules="addRules"
          label-width="80px"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addSysRoleAPI, getCompanyInfoAPI, getSysRoleAPI } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 10,
      // 每页条数
      pagesize: 2,
      curPage: 1,
      // 新增对话框
      addDialogVisible: false,
      addForm: {
        name: '',
        description: ''
      },
      addRules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      // 公司信息
      companyInfo: {}
    }
  },

  async created() {
    await this.getCompanyInfo()
    await this.getSysRole(this.curPage, this.pagesize)
  },

  methods: {
    // 获取所有员工列表
    async getSysRole(page, pagesize) {
      const data = await getSysRoleAPI(page, pagesize)
      // console.log(data)
      this.total = data.total
      this.tableData = data.rows
    },
    // 改变页码时
    currentChange(page) {
      // console.log(page);
      this.curPage = page
      this.getSysRole(page, this.pagesize)
    },
    // 改变每页数据条数
    handleSizeChange(val) {
      this.pagesize = val
      this.getSysRole(this.curPage, this.pagesize)
    },
    // 添加角色
    async addFn() {
      await this.$refs.form.validate()
      await addSysRoleAPI(this.addForm)
      this.$message.success('添加角色成功')
      this.addDialogVisible = false
      this.getSysRole(this.curPage, this.pagesize)
    },
    // 关闭新建弹出层时的重置表单
    closeAdd() {
      this.$refs.form.resetFields()
      this.addForm.region = ''
    },
    // 获取公司信息
    async getCompanyInfo() {
      const data = await getCompanyInfoAPI(
        this.$store.state.user.userInfo.companyId
      )
      // console.log(data)
      this.companyInfo = data
    }
  }
}
</script>

<style scoped lang="less"></style>
