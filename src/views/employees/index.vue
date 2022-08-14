<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcelFn"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="addDialogShow = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="tableData">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像">
            <template slot-scope="{ row }">
              <img
                v-imgError="
                  require('@/assets/common/68775e15bc12b22a0c38d8d556863767.jpeg')
                "
                :src="row.staffPhoto"
                alt=""
                class="imgA"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatterFormOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间">
            <template #default="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态">
            <template #default="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{ row }">
              <el-button
                type="text"
                size="small"
                @click="
                  $router.push({
                    path: '/employees/detail/' + row.id
                  })
                "
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :page-size="this.pages.size"
            :total="total"
            @current-change="currentChange"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
      <!-- 新增员工对话框 -->
      <AddDialog :addDialogShow.sync="addDialogShow"></AddDialog>
    </div>
  </div>
</template>

<script>
import { delEmployeeAPI, getEmployeesListAPI } from '@/api/employees'
import employees from '@/constant/employees'
const { exportExcelMapPath, hireType } = employees
import AddDialog from './components/AddDialog.vue'
export default {
  name: 'Employees',
  data() {
    return {
      tableData: [],
      pages: { page: 1, size: 10 },
      total: 10,
      // 新增员工对话框
      addDialogShow: false
    }
  },
  components: {
    AddDialog
  },
  created() {
    this.getEmployeesList()
  },

  methods: {
    // 获取员工列表
    async getEmployeesList() {
      const data = await getEmployeesListAPI(this.pages)
      // console.log(data)
      this.tableData = data.rows
      this.total = data.total
    },
    // 分页变化
    async currentChange(page) {
      this.pages.page = page
      await this.getEmployeesList()
    },
    // 格式化数据
    formatterFormOfEmployment(row, column, cellValue, index) {
      // console.log(employees.hireType)
      const curItem = employees.hireType.find((item) => item.id === cellValue)
      if (curItem) {
        return curItem.value
      }
      return '未知'
    },
    // 删除员工
    async delEmployee(id) {
      console.log(id)
      await this.$confirm('确认删除？')
      await delEmployeeAPI(id)
      this.$message.success('删除成功')
      this.getEmployeesList()
    },
    // 导出Excel文件
    async exportExcelFn() {
      // 导出功能
      const { export_json_to_excel } = await import('@/ventor/exportExcel')
      const { rows } = await getEmployeesListAPI(1, this.total)
      const keyList = Object.keys(exportExcelMapPath)
      const res = rows.map((item) => {
        // 生成和员工数量的一级数组，有几个员工生成几个item
        return keyList.map((item1) => {
          if (item1 === '聘用形式') {
            if (item[exportExcelMapPath[item1]] == 1) return '正式'
            if (item[exportExcelMapPath[item1]] == 2) return '非正式'
            return '未知'
          }
          // item中存放和表头数量相等的数据
          return item[exportExcelMapPath[item1]]
        })
      })
      export_json_to_excel({
        header: keyList,
        data: res,
        filename: '员工薪资表',
        autoWidth: true,
        bookType: 'xlsx'
      })
    }
  }
}
</script>

<style scoped>
.imgA {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
