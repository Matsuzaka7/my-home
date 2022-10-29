<template>
  <div class="main" ref="msgIptMain">
    <shearPlate></shearPlate>
    <div class="cont">
      <input
        ref="msgIpt"
        type="text"
        class="msgIpt"
        :placeholder="userName"
        @keyup.enter="CommitMsg"
        v-model="IptMsg"
        autocapitalize="off"
        disabled
      />

      <el-upload
        :action="$API.File.uploadFile"
        :before-upload="beforeUpload"
        :on-success="upload"
        class="el-upload"
      >
        <i class="pic iconfont icon-tupian"></i>
      </el-upload>
    </div>

    <button disabled ref="msgCommit" class="msgCommit" @click="CommitMsg">
      发送
    </button>
  </div>
</template>

<script>
import shearPlate from "@/components/shearPlate";
export default {
  name: "msgIpt",
  data() {
    return {
      IptMsg: "", // 文本
      userName: localStorage.getItem("userCookie")
        ? localStorage.getItem("userCookie")?.slice(8)
        : "请输入..",
    };
  },
  components: { shearPlate },
  created() {
    // 创建连接
    let _this = this;

    this.ws = new WebSocket(process.env.VUE_APP_BASE_WSS_URL);
    console.log(this.ws)

    // 接收到消息的回调
    this.ws.onmessage = function (evt) {
      let data = JSON.parse(evt.data)
      if (data.userMsgInfo) {
        // 给chatInfo传递数据展示
        _this.$bus.$emit("emitInfoMsg", data);
        // 判断是否在底部, 进行滚动操作(APP组件)
        _this.$isMessage(data.userMsgInfo);
      } else {
        // 走进这里代表没有cookie，服务器返回了一个
        localStorage.setItem("userCookie", data.userCookie);
      }

      /* evt.data.text().then((data) => {
        // 二进制处理
        if (data.userCookie !== null) {
          // 给chatInfo传递数据展示
          _this.$bus.$emit("emitInfoMsg", data);
          // 判断是否在底部, 进行滚动操作(APP组件)
          _this.$isMessage(data.userMsgInfo);
        } else {
          // 走进这里代表没有cookie，服务器返回了一个
          localStorage.setItem("userCookie", data.userCookie);
        }
      }); */
    };

    // 离开时销毁链接
    this.$bus.$on("destroySocket", () => {
      _this.ws.close();
    });
  },
  mounted() {
    // 消息加载完毕后显示输入框
    this.$bus.$on("elDisabled", () => {
      this.$refs.msgIpt.disabled = false;
      this.$refs.msgCommit.disabled = false;
      this.$refs.msgIptMain.style.bottom = "0px";
    });

    // 点击是否输入的框的回调
    this.$bus.$on("ReferenceToValue", (val)=>{
      this.IptMsg = val
    })
  },
  methods: {
    // 发送消息
    CommitMsg() {
      // 限制字数
      if (this.IptMsg.length > 200) {
        this.$message.error("超出字数限制");
      } else {
        // 发送请求，带上与消息
        this.ws.send(
          JSON.stringify({
            userMsg: this.IptMsg,
            userCookie: localStorage.getItem("userCookie"),
          })
        );
        this.IptMsg = ""; // 清空输入框
        this.$scrollBottom();
      }
    },
    // 上传图片之前的判断是否是图片
    beforeUpload(file) {
      const isJPGandPNG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";

      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isJPGandPNG || !isLt3M) {
        this.$message.error(
          "图片格式暂只支持: jpg / png / gif, 且大小不超过3M"
        );
      }

      return isJPGandPNG && isLt3M;
    },
    // 上传图片
    async upload(file) {
      this.ws.send(
        JSON.stringify({
          userMsg: file.ran + file.fileName,
          userMsgDate: 0,
          userCookie: localStorage.getItem("userCookie"),
          type: "img",
        })
      );
    },
  },
};
</script>

<style scoped>
.el-upload {
  width: 0;
}

.el-upload >>> ul {
  display: none;
}

.cont {
  position: relative;
  flex: 1;
  width: 100%;
}

.pic {
  position: absolute;
  top: 50%;
  right: 0.25rem;
  font-size: 0.7rem;
  color: #666;
  transform: translateY(-50%);
}

.main {
  display: flex;
  position: fixed;
  bottom: -60px;
  left: 0;
  right: 0;
  height: 1rem;
  padding: 0 5px;
  transition: all 0.5s;
}

.msgIpt {
  height: 100%;
  width: calc(100% - 2px);
  border: transparent;
  border-radius: 0.25rem;
  padding: 0 1rem 0 10px;
  transition: all 0.5s;
  margin-right: 2px;
  box-sizing: border-box;
  color: var(--submitIptColor);
  background: var(--submitIptBg);
}

.msgCommit {
  width: 2rem;
  height: 100%;
  border-radius: 10px;
  border: transparent;
  color: var(--submitIptColor);
  background: var(--submitIptBg);
  transition: all 0.5s;
}
</style>
