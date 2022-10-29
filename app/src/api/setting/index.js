import http from "../http";

const url = process.env.VUE_APP_BASE_API;
// 接口测试的接口
export const apiTest = (data) => {
  return http({
    url: `${url}/ApiTest`,
    method: "post",
    data
  });
};



