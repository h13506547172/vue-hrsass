<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="yearValue" @change="changeTime">
          <el-option
            v-for="item in yearOptions"
            :key="item"
            :label="item"
            :value="item"
          >
            {{ item }}
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="monthValue" @change="changeTime">
          <el-option
            v-for="item in 12"
            :key="item"
            :label="item + '月'"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 日历组件 -->
    <el-calendar v-model="calendarValue">
      <template #dateCell="{ date }">
        {{ date.getDate() }}
        <span v-if="isweekend(date)">休</span>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      yearValue: 2015,
      yearOptions: [2015, 2016, 2017, 2018, 2019],
      monthValue: 8,
      calendarValue: new Date()
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.yearValue = date.getFullYear()
      this.monthValue = date.getMonth() + 1
      this.yearOptions = Array(11)
        .fill(this.yearValue - 5)
        .map((item, index) => {
          return item + index
        })
      // console.log(this.yearOptions)
    },
    // 周末
    isweekend(day) {
      return day.getDay() === 6 || day.getDay() === 0
    },
    // 更改日历时间
    changeTime() {
      // console.log(11)
      const time = this.yearValue + '-' + this.monthValue
      this.calendarValue = time
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  th {
    border-bottom: 1px solid #ebeef5;
  }
  .el-calendar-table td {
    border: none;
    text-align: center;
    line-height: 70px;
  }
}
</style>
