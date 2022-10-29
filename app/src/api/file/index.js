import http from "../http";

const url = process.env.VUE_APP_BASE_API;
// 删除文件
export const deleteFile = (data) => {
  return http({
    url: `${url}/del`,
    method: "post",
    data: data,
  });
};

// 搜索文件
export const searchFile = (data) => {
  return http({
    url: `${url}/search`,
    method: "get",
    params: data,
  });
};

// 上传文件
export const uploadFile = `${url}/upload`;
// 查找文件的目录
export const getFileUrl = `${url}/uploads/`;
