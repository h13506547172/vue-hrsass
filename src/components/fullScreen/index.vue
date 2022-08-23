<template>
  <div style="margin: 0 8px">
    <svg-icon
      iconClass="fullscreen"
      className="fullsrcreen"
      @click="fn"
    ></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'fullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    fn() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      } else {
        // Ignore or do something else
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fullsrcreen {
  color: #fff;
}
</style>
