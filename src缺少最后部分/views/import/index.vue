<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UpdateExcel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></UpdateExcel>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
import { batchAddEmployeeAPI } from '@/api/employees'
const { importMapKeyPath } = employees
import { formatTime } from "@/filters/index";
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    // 上传之前判断文件格式
    excelSuccess(file) {
      // console.log(file)
      if (!file.name.endsWith('.xlsx')) {
        this.$message.error('请上传.xlsx文件')
        return false
      }
      return true
    },
    // 上传后获取文件内容
    async onSuccess({ results, header }) {
      console.log(results)
      const staffInfo = results.map((item) => {
        let info = {}
        for (const key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            let _date = new Date((item[key] - 1) * 24 * 60 * 60 * 1000)
            //time为excel记录的天数，先转换为毫秒数，再转为标准时间
            const data =formatTime( _date.setYear(_date.getFullYear() - 70))
            //setYear仅将_date的年份-70.其他不变
            info[importMapKeyPath[key]] = data
          } else {
            info[importMapKeyPath[key]] = item[key]
          }
        }
        return info
      })
      // console.log(staffInfo)
      await batchAddEmployeeAPI(staffInfo)
      this.$message.success('批量导入成功')
      this.$router.push('/employees')
    }
  }
}
</script>

<style scoped lang="less"></style>
