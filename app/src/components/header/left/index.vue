<template>
  <div class="LeftMenu" ref="left">
    <div class="top">
      <div class="img">
        <img src="@/assets/2365999861.png" alt="史上最可爱的砂糖" />
      </div>
      <div class="userName">
        <h1>松坂砂糖</h1>
        <span style="font-size: 12px; margin-top: 5px"
          >将于 2022-7-22 停止维护</span
        >
      </div>
    </div>
    <div class="center">
      <ul>
        <li
          :class="{ Bg: $route.path == '/home' }"
          @click="push($route.path,'/home', $event)"
        >
          <i class="iconfont icon-shouye"></i>我的主页
        </li>
        <li
          :class="{ Bg: $route.path == '/chat' }"
          @click="push($route.path, '/chat',$event)"
        >
          <i class="iconfont icon-liaotian"></i>闲聊室&nbsp;&nbsp;&nbsp;
        </li>
        <li
          :class="{ Bg: $route.path == '/upload' }"
          @click="push($route.path, '/upload', $event)"
        >
          <i class="iconfont icon-send-line"></i>上传文件
        </li>
        <li
          :class="{ Bg: $route.path == '/myStore' }"
          @click="push($route.path, '/myStore', $event)"
        >
          <i class="iconfont icon-cangkukucun"></i>我的上传
        </li>
        <li
          :class="{ Bg: $route.path == '/search' }"
          @click="push($route.path, '/search', $event)"
        >
          <i class="iconfont icon-sousuo"></i>搜索文件
        </li>
        <li
          :class="{ Bg: $route.path == '/delete' }"
          @click="push($route.path, '/delete', $event)"
        >
          <i class="iconfont icon-shanchu"></i>删除文件
        </li>
        <li @click="MyQQ"><i class="iconfont icon-QQ"></i>联系作者&nbsp;</li>
      </ul>
    </div>
    <div class="bottom" @click="push($route.path, '/setting', $event)">
      <span
        ><i class="iconfont icon-shezhi" style="margin-right: 5px"></i
        >设置</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderLeft",
  methods: {
    push(path, url, event) {
      // 点击之后跳转路由
      this.$router.push(url);
      // 如果想要跳转的路径和当前路径不一样就跳转，一样就不跳转
      if (path != url) {
        this.$bus.$emit("updateLeftFlag");
        this.$refs.left.style.left = -85 + "vw";
        this.$bus.$emit("updateTitle",event.target.innerText);
      }
    },
    MyQQ() {
      open("https://wpa.qq.com/msgrd?v=3&uin=2365999861&site=qq&menu=yes");
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: 500 !important;
  margin-top: 2px;
  margin-bottom: 0.1rem;
  line-height: 20px;
}
.Bg {
  background: rgba(0, 0, 0, 0.05);
  transition: all 0.15s;
}
.LeftMenu {
  position: relative;
  top: 0px;
  left: -85vw;
  z-index: 99;
  display: flex;
  flex-flow: column;
  max-width: 75vw;
  height: calc(100vh - 1rem);
  border-radius: 0 10px 10px 0;
  box-shadow:0 0 7px -5px rgb(0 0 0 / 50%);
  transition: left 0.5s;
  -webkit-transition: left 0.5s;
  -moz-transition: left 0.5s;
  -ms-transition: left 0.5s;
  -o-transition: left 0.5s;
  color: var(--color);
  background-color: var(--dbg);
  transition: all 0.5s;
}
.LeftMenu .top,
.LeftMenu .center,
.LeftMenu .bottom {
  border-radius: 5px;
}

.LeftMenu .top {
  display: flex;
  max-height: 100%;
  max-width: 100%;
  margin-top: 30px;
  margin-left: 10px;
}

.LeftMenu .top .userName {
  flex-wrap: wrap;
}

.LeftMenu .top img {
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  margin-right: 10px;
}

.LeftMenu .center {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 15px;
}

.LeftMenu .center ul {
  width: 100%;
  overflow: hidden;
}

.LeftMenu .center ul li {
  box-sizing: border-box;
  width: calc(100% - 10px);
  height: 0.9rem;
  line-height: 1rem;
  border-radius: 5px;
  margin: 5px;
}

.LeftMenu .center ul li i {
  margin: 0 10px;
  vertical-align: bottom;
}

.LeftMenu .center ul li::after {
  content: "\e8f1";
  font-family: "iconfont";
  position: relative;
  top: 0;
  right: -3rem;
}

.LeftMenu .bottom {
  height: 1rem;
  line-height: 1rem;
  margin-left: 5px;
  padding: 10px 10px;
}
</style>