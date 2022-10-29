# 关于前端

项目由vue2完成，是练手项目，仅供学习，其中有很多设计不合理的地方



### 启动项目

- 运行前，请确保后端已启动

- 进入 `app` 根路径后 使用 `npm run serve` 进行启动



### 关于请求路径问题

- 开发环境下打开 根目录下的 `.env.development` 文件进行修改
- 生产环境下打开 根目录下的 `.env.production` 文件进行修改
- 其中：
  - `VUE_APP_BASE_API`：为请求路径
  - `VUE_APP_BASE_WSS_URL`：为ws聊天模块的 ws 链接地址



### 已配置Vue配置代理，如需修改请前往 `根路径/vue.config.js` 


****


# 关于后端

- 由nodejs完成，使用框架为 express
- 未使用数据库，数据都保存在json中。如需使用数据库请自行更改



### 启动项目

- 进入 `app-end目录`

- 在根目录下执行 `node app.js`
- 推荐使用 `pm2` 进行托管



### 项目目录

- data：保存了静态数据
- key：用于存储 Https 的钥匙目录
- uploads：用户上传的文件、图片都包含在这里
- views：静态页面



### 其他

- ws开启端口为 1000

  - **ws端口修改后，请在前端 `.env.production` `.env.development` 修改 `VUE_APP_BASE_WSS_URL` 值**，否则请求失败，聊天功能将失效

- app开启端口为 80

  > 开启前，请确保这两个端口未被占用
