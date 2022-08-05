<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools
          :nodeName="{ name: '传值教育', manager: '负责人' }"
          :isRoot="false"
          @add="dialogVisible = true"
        ></TreeTools>
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps">
          <template v-slot="scope">
            <TreeTools
              :nodeName="scope.data"
              :isRoot="true"
              @remove="getDepartment"
              @add="dialogVisible = true"
            ></TreeTools>
          </template>
        </el-tree>
        <!-- 添加弹出层 -->
        <addPop :dialogVisible="dialogVisible"></addPop>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartmentAPI } from '@/api/departments'
// 引入转换树状数组的方法
import { dataToTress } from '@/utils'
import addPop from './components/addPop.vue'
export default {
  components: {
    TreeTools,
    addPop
  },
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        label: 'name'
      },
      isRoot: true,
      // 添加弹出层
      dialogVisible: false
    }
  },

  created() {
    this.getDepartment()
  },

  methods: {
    // 获取数据
    async getDepartment() {
      const data = await getDepartmentAPI()
      // console.log(data)
      this.treeData = dataToTress(data.depts, '')
    }
  }
}
</script>

<style scoped lang="less"></style>
