<template>
  <div
    class="i-x"
    ref="reference"
    v-show="isReferenceValue"
    v-if="showReference"
    @click="toValue"
  >
    <div class="shearPlateContainer">是否输入 "{{ value }}"</div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showReference: true, // 显示隐藏
      value: "", // 输入框值
      isReferenceValue: false, // 检测第一次与之后的内容是否重复
    };
  },
  props: {
    showTimer: {
      type: Number,
      default: 5,
    },
    showDirection: {
      type: String,
      default: "left",
    },
  },
  mounted() {
    // 消息加载完毕后执行显示
    this.$bus.$on("showReference", () => {
      this.$refs.reference.style.display = 'block'
      this.show(); // 一开始等1秒显示
    });
    this.getReference(); // 获取剪切板内容
  },
  methods: {
    // 确定输入
    toValue() {
      this.$bus.$emit('ReferenceToValue', this.value)
      this.hide(0);
    },
    // 获取剪切板的内容
    getReference() {
      const clipboard = navigator.clipboard.readText();
      clipboard.then((res) => {
        if (res.trim() !== "") this.value = res.trim();
        // 执行重复判断
        this.isReference(res.trim());
      });
    },
    // 检测输入框是否有值或与上一次的值一致，一致返回false
    isReference(val) {
      if (localStorage.getItem("ReferenceValue") === this.value) {
        // 重复了就隐藏
        this.showReference = false;
      } else {
        this.showReference = true;
      }
      localStorage.setItem("ReferenceValue", val);
    },
    // 隐藏
    hide(time) {
      this.$refs.reference.style[this.showDirection] = "5px";
      setTimeout(() => {
        this.$refs.reference.style[this.showDirection] = "-100vh";
        setTimeout(() => {
          this.showReference = false;
        }, 500);
      }, time);
    },
    // 显示
    show() {
      this.showReference = true;
      this.$refs.reference.style[this.showDirection] = "-100vh";
      setTimeout(() => {
        this.$refs.reference.style[this.showDirection] = "5px";
        this.hide(8000); // 8s后关闭
      }, 100);
    },
  },
};
</script>

<style scoped>
.i-x {
  display: none;
  background-color: var(--submitIptBg);
  color: var(--color);
  position: absolute;
  bottom: 1.1rem;
  border-radius: 3px;
  margin-right: 5px;
  transition: all 1.5s;
  padding: 10px 15px;
}
.shearPlateContainer {
  word-break: break-word;
  display: -webkit-box;
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis; /*隐藏后添加省略号*/
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
