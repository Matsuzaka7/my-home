import http from "../http";
import axios from 'axios'

const url = process.env.VUE_APP_BASE_API;
// 主页常见网址的数据
export const getNetwork = () => {
  return http({
    url: `${url}/getNetwork`,
    method: "post",
  });
};

// 词联想接口
export const getSugrec = (wd, that) => {
  return http({
    url: `${url}/sugrec`,
    method: "get",
    params:{
      wd
    },
    cancelToken: new axios.CancelToken(function executor(c) { // 设置 cancel token
      that.source = c;
    })
  });
};



