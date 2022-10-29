<template>
  <div>
    <div class="Maintop">
      <div class="left" @click="leftShow">
        <i class="iconfont icon-gengduo"></i>
      </div>
      <div class="center">
        <span ref="site_runtime">松坂砂糖</span>
      </div>
      <div
        class="right"
        id="sink"
        @click="$refs.sink.style.transform = `rotateZ(${num++ * 360}deg)`"
      >
        <i class="iconfont icon-xingxing" ref="sink"></i>
      </div>
    </div>
    <Left ref="left"></Left>
  </div>
</template>

<script>
let count = 0;
// 防抖函数, 给点击5次执行使用的
function debounce(fn, wait) {
  let timer;
  return function () {
    count++;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn();
      count = 0;
    }, wait);
  };
}

import Left from "./left";
export default {
  name: "Header",
  data() {
    return {
      isLeftFlag: true, // 左侧显示隐藏
      num: 1,
      // 连续点击的数据
    };
  },
  components: { Left },
  mounted() {
    // 点击5次反转颜色
    let _this = this;
    document.querySelector("#sink").addEventListener(
      "click",
      debounce(function () {
        if (count >= 5) {
          document.body.addEventListener('click', (e)=>{
            e.target.contentEditable = 'true'
            e.target.focus()
          })
          _this.$message.success("发现彩蛋啦, 去找找有什么不同吧");
        }
        count = 0;
      }, 300)
    );

    // 跳转路由后，左栏需要隐藏
    this.$bus.$on("updateLeftFlag", () => {
      this.isLeftFlag = !this.isLeftFlag;
    });

    // 点击app的center，需要隐藏两侧
    this.$bus.$on("closeLR", () => {
      if (this.isLeftFlag == false) {
        this.isLeftFlag = !this.isLeftFlag;
        this.$refs.left.$el.style.left = -85 + "vw";
      }
    });

    // 修改松坂砂糖横幅
    this.$bus.$on("updateTitle", (name) => {
      this.$refs.site_runtime.innerHTML = name;
    });
  },
  methods: {
    // 点击左侧按钮（显示隐藏）
    leftShow() {
      this.isLeftFlag = !this.isLeftFlag;
      if (this.isLeftFlag) {
        this.$refs.left.$el.style.left = -85 + "vw";
      } else {
        this.$refs.left.$el.style.left = 0;
      }
    },
  },
};
</script>

<style scoped>
i {
  display: inline-block;
  transition: all 1s;
}
.Maintop {
  box-sizing: border-box;
  z-index: 999;
  display: flex;
  width: 100%;
  height: 1rem;
  color: var(--titleColor);
  text-align: center;
  line-height: 1rem;
  background-color: var(--title);
  transition: all 0.5s;
}

.Maintop .center {
  flex: 1;
}

.Maintop .left,
.Maintop .right {
  width: 1rem;
}

.Maintop .iconfont {
  color: var(--titleColor);
}
</style>
