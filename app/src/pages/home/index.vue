<template>
  <div class="home">
    <div class="homeSearch">
      <h1>百度搜索</h1>
      <div class="homeSearchInput">
        <input
          type="text"
          placeholder="搜索内容..."
          v-model="inputVal"
          @keyup.enter="inputChange"
          @input.trim="inputValChange"
        />
      </div>

      <ul class="associateBox" v-if="ulShow">
        <li
          @click.stop="openUrl"
          class="associate"
          v-for="(item, index) in arrData"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <div v-for="(item, index) in netWork" :key="index">
      <h1 @click="showDiv(index)">
        {{ item.name
        }}<i
          ref="Iicon"
          class="Iicon iconfont icon-xiayiyeqianjinchakangengduo"
        ></i>
      </h1>
      <div class="homeCommonItem" ref="homeCommonItem">
        <div ref="common" v-for="(work, index) in item.children" :key="index">
          <a :href="work.url">
            <h2>{{ work.name }}</h2>
            <p>{{ work.description }}</p>
            <span>{{ work.url }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      inputVal: "", // 搜索框内容
      arrData: [], // 联想词的数据
      netWork: [], // 用于展示的数据
      source: null, // 用于存储是否取消请求的标志
      ulShow: false, // 是否展示ul列表的变量
    };
  },
  async created() {
    const res = await this.$API.Home.getNetwork();
    if (res.status === 200) {
      this.netWork = res.data;
      // 拿到数据之后就遍历数据
      this.netWork.forEach((item, index) => {
        this.$nextTick(() => {
          // dom更新后就马上计算每个盒子的高度, 用于给点击隐藏做高度的记录
          item.height = this.$refs.homeCommonItem[index].offsetHeight;
          // 给盒子添加height属性, 如果不添加会有bug
          this.$refs.homeCommonItem[index].style.height = item.height + "px";
        });
      });
    }
  },
  mounted() {
    document.querySelector(".Center").addEventListener("click", () => {this.ulShow = false}, true);
  },
  methods: {
    cancelQuest() {
      if (typeof this.source === "function") {
        this.source("终止请求"); //取消请求
      }
    },
    // 词联想回调
    async inputValChange() {
      this.cancelQuest(); // 请求发送前调用
      const res = await this.$API.Home.getSugrec(this.inputVal, this);
      if (res.status === 200) {
        this.ulShow = true;
        // 初始位置
        const indexS = res.data.indexOf("s:[");
        // 获取字符串的数组数据(联想词的所有词)
        this.arrData = JSON.parse(res.data.slice(indexS + 2, -3));
      }
    },
    // 点击li的回调
    openUrl(event) {
      open(`https://www.baidu.com/s?ie=utf-8&wd=${event.target.innerText}`);
    },
    // 搜索框输入的回调
    inputChange() {
      open(`https://www.baidu.com/s?ie=utf-8&wd=${this.inputVal}`);
    },
    // 显示隐藏常见网址的回调
    showDiv(index) {
      if (this.netWork[index].isShow) {
        this.$refs.homeCommonItem[index].style.height = 0;
        this.$refs.Iicon[index].style.transform = "rotate(0deg)";
      } else {
        this.$refs.homeCommonItem[index].style.height =
          this.netWork[index].height + "px";
        this.$refs.Iicon[index].style.transform = "rotate(90deg)";
      }
      this.netWork[index].isShow = !this.netWork[index].isShow;
    },
  },
};
</script>

<style scoped>
.associateBox {
  position: absolute;
  margin-top: 5px;
  color: var(--homeSearchColor);
  background-color: var(--homeSearchBg);
  border-radius: 5px;
  width: 100%;
  box-shadow: 0 0 4px -3.5px #000;
}
.associate {
  padding: 0.3rem 0.6rem;
  transition: all 0.5s;
}

.associate:hover {
  padding: 0.3rem 1rem;
  background-color: var(--bgop);
}
.Iicon {
  margin-left: 5px;
  display: inline-block;
  transform: rotate(90deg);
  transition: all 0.5s;
}
h1 {
  font-size: 0.35rem;
  font-weight: 350;
  margin-bottom: 0.1rem;
  margin-top: 0.5rem;
}

.homeSearch h1 {
  margin-top: 0;
}
.home {
  padding: 0 0.3rem;
}

.homeSearch {
  position: sticky;
  top: 0px;
  z-index: 999;
}
.homeSearch .homeSearchInput input {
  box-sizing: border-box;
  width: 100%;
  height: 1rem;
  border: 0px;
  text-indent: 1em;
  border-radius: 5px;
  color: var(--homeSearchColor);
  background-color: var(--homeSearchBg);
  box-shadow: 0 0 4px -3.5px #000;
}

.homeCommonItem {
  display: flex;
  margin-bottom: 0.5rem;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.5s;
}

.homeCommonItem > div {
  margin: 0.1rem 0;
  border-radius: 5px;
  background-color: var(--dbg);
  padding: 0.2rem;
  box-shadow: 0 0 5px -4.5px #000;
}

.homeCommonItem > div a h2 {
  color: var(--color);
  font-size: 14px;
  font-weight: 400;
}
.homeCommonItem > div a p {
  color: var(--color);
  font-size: 12px;
}
.homeCommonItem > div a span {
  font-size: 12px;
  color: cadetblue;
  font-weight: 300;
}
</style>
