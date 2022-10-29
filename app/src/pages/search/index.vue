<template>
  <div class="bar1">
    <div class="div">
      <input type="text" v-model="value" placeholder="仅搜索本站已上传内容..." @keyup.enter="search"/>
      <button type="submit" @click="search">
        <i class="iconfont icon-sousuo"></i>
      </button>
    </div>

    <ul class="el-upload-list el-upload-list--text">
      <li tabindex="0" class="el-upload-list__item is-success" v-for="(item, index) in data" :key="index">
        <a class="el-upload-list__item-name" :href="`${$API.File.getFileUrl+data[index]}`"><i
            class="el-icon-document"></i>{{ data[index] }} </a><label class="el-upload-list__item-status-label"></label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      value: "",
      data: null,
    };
  },
  methods: {
    async search() {
      let { data } = await this.$API.File.searchFile({ name: this.value });
      this.data = data;
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

ul {
  overflow: auto;
  height: 83vh;
  margin-top: 10px;
}

.div {
  position: relative;
}

.el-upload-list__item-name {
  margin-right: 10px;
}

input {
  width: 100%;
  padding-left: 13px;
  font-size: 12px;
}

button {
  width: 42px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 5px 5px 0;
}

.el-upload-list__item {
  margin-bottom: 5px;
  margin-top: 0;
}

</style>