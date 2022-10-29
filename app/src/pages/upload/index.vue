<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :action="$API.File.uploadFile"
      :on-success="upload"
      :on-error="err"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        请不要上传超过200M的内容，如需分享请长按以下文本复制链接
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: "upload",
  data() {
    return {
      obj: JSON.parse(localStorage.getItem("MyFile")) || [],
    };
  },
  methods: {
    upload(file) {
      const FileUrl = this.$API.File.getFileUrl + file.ran + file.fileName;
      const FileName = file.ran + file.fileName;
      // 上传成功后调用，把这个组件中的a标签href属性更改
      let El_A = document.querySelectorAll(".el-upload-list__item-name");
      El_A[El_A.length - 1].href = FileUrl;
      El_A[El_A.length - 1].innerText = FileName;

      // 上传成功后放入本地存储
      this.obj.push({
        name: FileName,
        url: FileUrl,
      });
      localStorage.setItem("MyFile", JSON.stringify(this.obj));
    },
    err(err) {
      // 失败时调用
      this.$message.error("上传失败，请稍后重试，或联系网站负责人")
      console.log('上传失败', err);
    },
  },
};
</script>

<style scoped>
.upload-demo >>> .el-upload {
  width: 100% !important;
  border-radius: 6px;
}

.upload-demo >>> .el-upload-dragger {
  width: 100% !important;
  color:  var(--color);
  background: var(--dbg);
  border: var(--border);
}
</style>