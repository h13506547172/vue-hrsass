<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :iconShow="false">
        <template #right>
          <el-button type="primary" @click="showDialogFn('0', 1)"
            >添加权限</el-button
          >
        </template>
      </PageTools>
      <el-table
        :data="tableData"
        style="width: 100%"
        class="table"
        row-key="id"
        ref="table"
      >
        <el-table-column label="名称" align="center">
          <template #default="{ row }">
            <i
              v-if="row.children"
              class="el-icon-folder-opened"
              @click="unfold(row)"
            ></i>
            <!-- 二级数状图标 -->
            <i v-if="row.type === 2" class="el-icon-tickets"></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" align="center">
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <a href="javascript:;" @click="showDialogFn(row.id, row.type + 1)"
              >添加</a
            >
            <a href="javascript:;">编辑</a>
            <a href="javascript:;">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加权限 -->
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog
        title="添加权限点"
        :visible.sync="showDialog"
        @close="btnCancel"
      >
        <!-- 表单 -->
        <el-form
          ref="perForm"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width: 90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK"
              >确定</el-button
            >
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionListAPI } from '@/api/permission'
import { dataToTress } from '@/utils/index'
import { addpermissionAPI } from '@/api/setting'
export default {
  name: 'permission',
  data() {
    return {
      tableData: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入标签',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入标签',
            trigger: 'blur'
          }
        ]
      },
      showDialog: false
    }
  },

  created() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      const data = await getPermissionListAPI()
      // console.log(data);
      this.tableData = dataToTress(data, '0')
    },
    // 展开树状结构
    unfold(row) {
      row.expanded = !row.expanded
      this.$refs.table.toggleRowExpansion(row, row.expanded)
    },
    // 显示添加权限弹出层
    showDialogFn(id, type) {
      this.formData.pid = id
      this.formData.type = type
      this.showDialog = true
    },
    // 关闭弹窗
    btnCancel() {
      this.showDialog = false
    },
    async btnOK() {
      await this.$refs.perForm.validate()
      await addpermissionAPI(this.formData)
      this.btnCancel()
      await this.getPermissionList()
      this.$message.success('添加成功')
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  a {
    margin-right: 5px;
  }
  ::v-deep .el-table__expand-icon {
    display: none;
  }
}
</style>
