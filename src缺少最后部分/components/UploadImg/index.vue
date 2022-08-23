<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      list-type="picture-card"
      :limit="1"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :class="{ hidden: fileList.length }"
      class="upload-img"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDNbdS3QbXHn7E9qIXZOyd5JJ4bu0rUt53',
  SecretKey: '6ye8On9HBuQj2EF3d9SXOCqHUTEoBLI1'
})
export default {
  // SecretId: AKIDNbdS3QbXHn7E9qIXZOyd5JJ4bu0rUt53
  // SecretKey: 6ye8On9HBuQj2EF3d9SXOCqHUTEoBLI1
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      // 放大图片对话框
      dialogVisible: false,
      dialogImageUrl: '',
      // 加载中
      loading: false
    }
  },

  created() {},

  methods: {
    // 上传文件事件
    onRequest({ file }) {
      this.loading = true
      // console.log(file)
      cos.putObject(
        {
          Bucket: 'heima-31-2-1313341642' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 上传文件名称*/,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            // console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          // 不管成功还是失败都会进此函数
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败请重试')
          }
          // console.log('https://' + data)
          this.$emit('onSuccess', { url: 'https://' + data.Location })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      // console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeUpload(file) {
      // 限制上传的图片类型
      const restrict = ['image/jpeg', 'image/gif', 'image/png']
      if (!restrict.includes(file.type)) {
        this.$message.error('请选择' + restrict.join('、') + '格式的文件')
        return false
      }
      // 限制上传图片大小
      const maxSize = 1024 * 1024 * 2 // 2mb
      if (file.size > maxSize) {
        this.$message.error('文件大小不能超过2mb')
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.hidden {
  .el-upload--picture-card {
    display: none;
  }
}
.upload-img {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
