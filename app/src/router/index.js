import vue from "vue";
import vueRouter from "vue-router";

vue.use(vueRouter);

const Home = () => import("@/pages/home");
const Upload = () => import("@/pages/upload");
const myStore = () => import("@/pages/myStore");
const Search = () => import("@/pages/search");
const Delete = () => import("@/pages/delete");
const Chat = () => import("@/pages/chat");
const Setting = () => import("@/pages/setting");

export default new vueRouter({
  // 配置路由
  mode: "history",
  routes: [
    {
      // 重定向
      path: "",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/upload",
      component: Upload,
    },
    {
      path: "/myStore",
      component: myStore,
    },
    {
      path: "/search",
      component: Search,
    },
    {
      path: "/delete",
      component: Delete,
    },
    {
      path: "/chat",
      component: Chat,
    },
    {
      path: "/setting",
      component: Setting,
    }
  ],
});
