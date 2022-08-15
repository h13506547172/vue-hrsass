<template>
  <div>
    <UploadImg @onSuccess="onSuccessFn"></UploadImg>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    onSuccessFn(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped></style>
