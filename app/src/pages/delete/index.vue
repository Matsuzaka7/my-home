<template>
  <div>
    <input  type="text" placeholder="请输入要删除的文件名" v-model="FileName" />
    <input  type="text" placeholder="请输入权限码" v-model="Code" />
    <button  @click="del" @keyup.enter="sub">
      <i class="iconfont icon-shanchu"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "delete",
  data() {
    return {
      FileName: "",
      Code: "",
    };
  },
  methods: {
    async del() {
      if (this.Code) {
        let { data } = await this.$API.File.deleteFile({ FileName: this.FileName, Code: this.Code })
        this.$message(data);
      } else {
        this.$message.error('请输入权限码');
      }
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
}

input {
  flex: 0.45;
  text-indent: 1em;
  margin-right: 5px;
}

button {
  flex: 0.1;
}
</style>