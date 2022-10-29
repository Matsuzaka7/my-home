import axios from 'axios'

let requests = axios.create({
  // baseURL: "/api",
  timeout: 6000,
});

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
  /* 
  if(store.state.detail.uuid_token){
    //请求头添加一个字段(userTempId):和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  //需要携带token带给服务器
  if(store.state.user.token){
    config.headers.token = store.state.user.token;
  }
  return config; */
  return config;
});

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
  (res) => {
    //进度条结束
    //相应成功做的事情
    return res;
  },
  (err) => {
    console.log("服务器响应数据失败, 请稍后重试或联系管理员");
  }
);
export default requests;