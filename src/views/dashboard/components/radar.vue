<template>
  <div ref="main" class="radar"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Radar',
  data() {
    return {
      options: {
        title: {
          text: '基础雷达图'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '考勤', max: 100 },
            { name: '助人', max: 100 },
            { name: 'bug', max: 100 },
            { name: '分享', max: 100 },
            { name: '管理', max: 100 },
            { name: '技术', max: 100 }
          ],
          splitArea: {
            areaStyle: {
              color: ['#fff', '#000']
            }
          }
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [100, 100, 100, 100, 100, 20],
                name: '阿蛋'
              },
              {
                value: [10, 20, 30, 40, 50, 60],
                name: '小金'
              }
            ],
            // 修饰我们区域填充的背景颜色
            areaStyle: {
              color: 'rgba(238, 197, 102, 0.6)'
            }
          }
        ]
      }
    }
  },

  created() {},
  mounted() {
    this.echartsInit()
  },
  methods: {
    echartsInit() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      myChart.setOption(this.options)
    }
  }
}
</script>

<style lang="scss" scoped>
.radar {
  width: 570px;
  height: 440px;
}
</style>
