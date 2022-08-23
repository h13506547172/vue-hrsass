<template>
  <el-dropdown trigger="click" @command="toggleLangFn">
    <span class="el-dropdown-link">
      <svg-icon iconClass="language"></svg-icon>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="key === $root.$i18n.locale"
        v-for="(item, key) in messages"
        :key="key"
        :command="key"
        >{{ item.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookies from 'js-cookie'
export default {
  name: 'toggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    // 切换语言
    toggleLangFn(val) {
      // console.log(val)
      this.$root.$i18n.locale = val
      Cookies.set('lang', val)
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped></style>
