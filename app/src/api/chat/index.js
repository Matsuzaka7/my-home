import http from "../http";

// 获取消息
// const url = '/api'
const url = process.env.VUE_APP_BASE_API
export const getMsgInfo = (data) => {
  return http({
    url: `${url}/getMsgInfo`,
    method: "post",
    data: data,
  });
};

// 发送数据
export const sendMsgInfo = () => {
  return http({
    url: `${url}/msgInfo`,
    method: "post",
  });
};


