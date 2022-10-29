<template>
  <div>
    <el-empty description="暂无文件" v-if="isShow">
      <h1>该功能使用本地存储，请尽量不要切换浏览器，否则记录会清空</h1>
    </el-empty>
    <ul v-if="!isShow" class="el-upload-list el-upload-list--text">
      <li
        tabindex="0"
        class="el-upload-list__item is-success"
        v-for="(item, index) in myFile"
        :key="index"
      >
        <a class="el-upload-list__item-name" :href="item.url"
          ><i class="el-icon-document"></i>{{ item.name }} </a
        ><label class="el-upload-list__item-status-label"></label
        ><i class="el-icon-close" @click="del(index)" style="display: block"></i
        ><i class="el-icon-close-tip">按 delete 键可删除</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "myStore",
  data() {
    return {
      myFile: JSON.parse(localStorage.getItem("MyFile")) || [],
    };
  },
  methods: {
    del(index) {
      // 删除文件记录
      this.myFile.splice(index, 1);
      localStorage.setItem("MyFile", JSON.stringify(this.myFile));
    },
  },
  computed: {
    isShow() {
      // 如果数组长度为0，就显示图标
      if (this.myFile.length == 0 || !this.myFile) {
        return true;
      } else {
        return false
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #666;
  font-size: 12px;
  font-weight: bold;
}
.el-upload-list__item-name {
  color: var(--dcolor)
}
.el-upload-list__item:hover {
  color: var(--dcolor);
  background-color: var(--bgop);
}

ul {
  overflow: auto;
  height: 92vh;
}

ul li {
  margin-top: 0 !important;
  margin-bottom: 5px;
}
</style>