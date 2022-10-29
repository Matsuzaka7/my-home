const { defineConfig } = require("@vue/cli-service");

const isProduction = process.env.VUE_APP_ENV !== "dev";
// 本地环境是否需要使用cdn
const devNeedCdn = false;
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    marked: "marked",
    "highlight.js": "hljs",
    nprogress: "NProgress",
    axios: "axios",
    "element-ui": "element-ui",
  },
  // cdn的css链接
  css: [
    "https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.15.6/theme-chalk/index.min.css",
  ],
  // cdn的js链接
  js: [
    "https://cdn.bootcss.com/vue/2.6.14/vue.min.js",
    "https://cdn.bootcss.com/vue-router/2.8.1/vue-router.min.js",
    "https://cdn.bootcss.com/axios/0.26.1/axios.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.15.6/index.js",
  ],
};
module.exports = {
  chainWebpack: (config) => {
    // ============注入cdn start============
    config.plugin("html").tap((args) => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn;
      return args;
    });
    // ============注入cdn start============
  },
  configureWebpack: (config) => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals;
  },
};

module.exports = defineConfig({
  publicPath: "./", // 静态资源路径
  outputDir: "dist", // 打包后文件的目录
  assetsDir: "static", // outputDir的静态资源(js、css、img、fonts)目录
  productionSourceMap: false, // 去除map文件
  lintOnSave: false,
  devServer: {
    proxy: {
      // 配置跨域
      "/api": {
        target: "http://127.0.0.1", // 配置跨域接口
        ws: true, // 是否跨域。
        changOrigin: true, // 是否跨域。
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
