<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="12">
        <el-tag>
          <i class="el-icon-info" v-if="iconShow"></i>
          <slot name="left"></slot>
        </el-tag>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" justify="end">
          <slot name="right"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools',
  props: {
    iconShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style lang="less" scoped></style>
