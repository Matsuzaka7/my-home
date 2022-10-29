<template>
  <div class="infoBox" ref="infoBox">
    <div v-if="info.length" class="infoItemBox">
      <span class="infoLengths">消息数: {{ info.length }}</span>
      <div :class="isBox(infoItem, 'info')" v-for="infoItem in info">
        <span :class="isBox(infoItem, 'user')">
          <img src="@/assets/userImg.png" class="userImgRight" />
          <p class="userNameRight">
            {{ " 可恶的网友 - " + infoItem.userCookie.slice(8) }}
          </p>
        </span>
        <span :class="isBox(infoItem, 'msg')" ref="msg">
          <span v-if="infoItem.type == 'img'">
            <img
              class="infoImg"
              v-lazy="$API.File.getFileUrl + infoItem.userMsgInfo"
              title="**发生了意外错误**"
              @click="imageEvent(infoItem)"
            />
          </span>
          <span v-else class="userMsgInfo">{{ infoItem.userMsgInfo }}</span>
          <span class="time">Time: {{ timeFormat(infoItem.userMsgDate) }}</span>
        </span>
      </div>
    </div>

    <!-- 展示放大的图片的地方 -->
    <div v-if="imgShow.show" class="imgShow" @click="shotImg()">
      <img
        :src="imgShow.imgUrl"
        title="**发生了意外错误**"
        ref="bigImg"
        class="bigImg"
      />
    </div>

    <!-- 加载时的动画 -->
    <div v-if="!info.length">
      <div class="flexbox">
        <div>
          <div class="load"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MovingPic } from "@/tool/MovingPic.js";
import { timeFormat } from "@/tool/tools.js";
export default {
  name: "chatInfo",
  data() {
    return {
      info: [],
      infoMarginTop: [],
      // 点击图片后展示的变量
      imgShow: {
        show: false,
        imgUrl: "",
      },
    };
  },
  async created() {
    this.timeFormat = timeFormat;
    this.$bus.$on("emitInfoMsg", (data) => {
      this.info.push(data);
    });
    // 获取聊天数据
    let res = await this.$API.Chat.getMsgInfo();
    if (res.status === 200) {
      this.info = res.data;
      setTimeout(() => {
        this.$bus.$emit("elDisabled"); // 设置msgIpt的禁用
        this.$scrollBottom(); // 页面滚动
        this.$bus.$emit("showReference");
      }, 200);
    }
  },
  methods: {
    // 判断消息是谁的
    isBox(infoItem, className) {
      let cookieValue = localStorage.getItem("userCookie");
      return cookieValue == infoItem.userCookie
        ? `${className}Left`
        : `${className}Right`;
    },
    // 点击图片, 放大图片的回调
    imageEvent(imgData) {
      this.imgShow.show = true;
      this.imgShow.imgUrl = this.$API.File.getFileUrl + imgData.userMsgInfo;

      // 图片移动
      this.$nextTick(() => {
        MovingPic(".bigImg");
      });
    },
    // 点击放大的图片关闭
    shotImg() {
      this.imgShow.show = false;
    },
  },
};
</script>

<style scoped>
.userMsgInfo {
  word-break: break-word;
}
.imgShow {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
}

.imgShow img {
  position: absolute;
  max-width: 95vw;
  max-height: 95vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}

.flexbox > div {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.load {
  width: 2rem;
  height: 2rem;
  background: transparent;
  border-top: 4px solid #009688;
  border-right: 4px solid transparent;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.userRight {
  display: flex;
}

.userLeft {
  display: flex;
  flex-direction: row-reverse;
}

.infoLengths {
  position: fixed;
  top: 1rem;
  right: 2px;
  color: var(--color);
  transition: color 0.5s;
  -moz-user-select: none;
  /* Firefox私有属性 */
  -webkit-user-select: none;
  /* WebKit内核私有属性 */
  -ms-user-select: none;
  /* IE私有属性(IE10及以后) */
  -khtml-user-select: none;
  /* KHTML内核私有属性 */
  -o-user-select: none;
  /* Opera私有属性 */
  user-select: none;
  /* CSS3属性 */
}

.infoBox {
  padding-bottom: 25px;
}

.infoImg {
  width: 100%;
  border-radius: 0.1rem;
  max-height: 75vh;
}

.time {
  -moz-user-select: none;
  /* Firefox私有属性 */
  -webkit-user-select: none;
  /* WebKit内核私有属性 */
  -ms-user-select: none;
  /* IE私有属性(IE10及以后) */
  -khtml-user-select: none;
  /* KHTML内核私有属性 */
  -o-user-select: none;
  /* Opera私有属性 */
  user-select: none;
  /* CSS3属性 */
}

.infoRight {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.infoLeft {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.userImgRight {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  margin-top: 2px;
  -moz-user-select: none;
  /* Firefox私有属性 */
  -webkit-user-select: none;
  /* WebKit内核私有属性 */
  -ms-user-select: none;
  /* IE私有属性(IE10及以后) */
  -khtml-user-select: none;
  /* KHTML内核私有属性 */
  -o-user-select: none;
  /* Opera私有属性 */
  user-select: none;
  /* CSS3属性 */
}

.userImgLeft {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  margin-top: 2px;
  -moz-user-select: none;
  /* Firefox私有属性 */
  -webkit-user-select: none;
  /* WebKit内核私有属性 */
  -ms-user-select: none;
  /* IE私有属性(IE10及以后) */
  -khtml-user-select: none;
  /* KHTML内核私有属性 */
  -o-user-select: none;
  /* Opera私有属性 */
  user-select: none;
  /* CSS3属性 */
}

.userNameRight {
  -moz-user-select: none;
  /* Firefox私有属性 */
  -webkit-user-select: none;
  /* WebKit内核私有属性 */
  -ms-user-select: none;
  /* IE私有属性(IE10及以后) */
  -khtml-user-select: none;
  /* KHTML内核私有属性 */
  -o-user-select: none;
  /* Opera私有属性 */
  user-select: none;
  /* CSS3属性 */
  font-size: 0.25rem;
  padding: 0 10px;
}

.userNameLeft {
  -moz-user-select: none;
  /* Firefox私有属性 */
  -webkit-user-select: none;
  /* WebKit内核私有属性 */
  -ms-user-select: none;
  /* IE私有属性(IE10及以后) */
  -khtml-user-select: none;
  /* KHTML内核私有属性 */
  -o-user-select: none;
  /* Opera私有属性 */
  user-select: none;
  /* CSS3属性 */
  font-size: 0.25rem;
  padding: 0 10px;
}

.msgRight {
  display: flex;
  position: relative;
  top: -0.6rem;
  left: 1.7rem;
  padding: 15px;
  max-width: 42vw;
  max-height: 80vh;
  color: #ddd;
  background-color: #22252a;
  border-radius: 0.1rem;
  box-shadow: 0 0 7px -4px #000;
  align-content: stretch;
  word-wrap: break-word;
  flex-direction: column;
}

.msgLeft {
  display: flex;
  position: relative;
  top: -0.6rem;
  right: 1.7rem;
  padding: 15px;
  max-width: 42vw;
  color: #ddd;
  background-color: #22252a;
  border-radius: 0.1rem;
  box-shadow: 0 0 7px -4px #000;
  flex-direction: column;
  word-wrap: break-word;
  align-content: space-between;
  align-items: flex-end;
}

.msgRight::before {
  position: absolute;
  top: 10px;
  left: -16px;
  content: "";
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right: 10px solid #22252a;
}

.msgLeft::before {
  position: absolute;
  top: 10px;
  right: -16px;
  content: "";
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left: 10px solid #22252a;
}
</style>
