<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" name="first">
            <!-- 放置表单 -->
            <el-form
              :model="formData"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formData.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <userInfo></userInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third" >
            <jobs></jobs>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserMoreInfoAPI } from '@/api/user'
import { saveEmployeeInfoAPI } from '@/api/employees'
import userInfo from './components/user-info.vue'
import Cookies from 'js-cookie'
import jobs from "./components/jobs.vue";
export default {
  components: {
    userInfo,
    jobs
  },
  data() {
    return {
      activeName: Cookies.get('curActive') || 'first',
      formData: {}
    }
  },

  async created() {
    await this.getUserMoreInfo()
  },

  methods: {
    // 切换activ事件
    handleClick() {
      Cookies.set('curActive', this.activeName)
    },
    async getUserMoreInfo() {
      this.formData = await getUserMoreInfoAPI(this.$route.params.id)
    },
    async onSave() {
      await saveEmployeeInfoAPI(this.$route.params.id, this.formData)
      this.$message.success('更新信息成功')
    }
  }
}
</script>

<style lang="less" scoped></style>
