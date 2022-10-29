<template>
  <div class="mainDiv" ref="mainDiv">
    <Header class="header"></Header>
    <div class="Center" @click="center">
      <keep-alive include="chat">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { debounce } from "./tool/Debounce"; // 防抖函数
import { setTheme } from "./tool/tools";
window.addEventListener("storage", (e) => {
  localStorage.setItem(e.key, e.oldValue);
});
export default {
  name: "App",
  components: {
    Header,
  },
  created() {
    // 设置全局样式
    if (!localStorage.getItem("Global-theme"))
      localStorage.setItem("Global-theme", "跟随系统");
    setTheme(localStorage.getItem("Global-theme"));
    this.$bus.$on("setGlobalTheme", (val) => {
      setTheme(val);
    });
  },
  mounted() {
    const getWindowInfo = () => {
      this.$isMessage();
    };
    const cancalDebounce = debounce(getWindowInfo, 200);
    // 每次屏幕变化尺寸, 都重新滚动到最底部 (用户打开输入法时, 高度会减小, 内容会被挤下去)
    window.addEventListener("resize", cancalDebounce);

    setTimeout(() => {
      this.$refs.mainDiv.style.opacity = 1;
    }, 0);
  },
  methods: {
    center() {
      this.$bus.$emit("closeLR");
    },
  },
  beforeDestroy() {
    this.$bus.$emit("destroySocket");
  },
};
</script>

<style>
::selection {
  color: #efefef;
  background-color:darkorange;
}

:root {
  --sbg: rgb(251, 251, 251);
  --dbg: #fff;
  --bgop: rgba(0, 0, 0, 0.1);
  --color: #333;
  --border: 1px dashed #000;
  --iptBg: #fff;
  --title: rgb(251, 251, 251);
  --titleColor: #000;
  --submitIptBg: rgb(239, 239, 239);
  --submitIptColor: #333;
  --homeSearchBg: #fff;
  --homeSearchColor: #000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --sbg: #2d3035;
    --dbg: #22252a;
    --bgop: rgba(255, 255, 255, 0.5);
    --color: #fff;
    --border: 1px dashed #000;
    --iptBg: #24272c;
    --title: #2d3035;
    --titleColor: #fff;
    --submitIptBg: #24272c;
    --submitIptColor: #aaa;
    --homeSearchBg: #22252a;
    --homeSearchColor: #fff;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --sbg: rgb(251, 251, 251);
    --dbg: #fff;
    --bgop: rgba(0, 0, 0, 0.1);
    --color: #333;
    --border: 1px dashed #000;
    --iptBg: #fff;
    --title: rgb(251, 251, 251);
    --titleColor: #000;
    --submitIptBg: rgb(239, 239, 239);
    --submitIptColor: #333;
    --homeSearchBg: #fff;
    --homeSearchColor: #000;
  }
}

input,
button {
  height: 42px;
  color: var(--color);
  background-color: var(--iptBg);
  border: var(--border);
  border-radius: 5px;
  transition: all 0.5s;
}
.mainDiv {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--color);
  z-index: 100;
  opacity: 0;
  transition: opacity 0.5s;
}

.Center {
  position: absolute;
  top: 1rem;
  left: 0;
  width: 100%;
  height: calc(100% - 1rem);
  padding: 10px 10px 0;
  box-sizing: border-box;
  color: var(--color);
  background-color: var(--sbg);
  overflow: auto;
  z-index: 1;
  transition: background 0.5s;
}
</style>
