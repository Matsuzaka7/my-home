<template>
  <div>
    <ChatInfo></ChatInfo>
    <MsgIpt></MsgIpt>
  </div>
</template>

<script>
import ChatInfo from "./children/chatInfo.vue";
import MsgIpt from "./children/msgIpt.vue";
export default {
  name: "chat",
  components: { ChatInfo, MsgIpt },
  activated() {
    // 组件激活时，刷新高度滚到最底部
    this.$scrollBottom()
  },
  
};
</script>
