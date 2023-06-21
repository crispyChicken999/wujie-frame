import App from "./App.vue";
import router from "./router";
import { setupStore } from "@/store";
import ElementPlus from "element-plus";
import { getServerConfig } from "./config";
import { createApp, Directive } from "vue";
import { MotionPlugin } from "@vueuse/motion";
// import { useEcharts } from "@/plugins/echarts";
import { injectResponsiveStorage } from "@/utils/responsive";

// import Table from "@pureadmin/table";
// import PureDescriptions from "@pureadmin/descriptions";

// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./style/tailwind.css";
import "element-plus/dist/index.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";
// 全屏
import { useFullscreen } from "@vueuse/core";
const { toggle } = useFullscreen();

const app = createApp(App);

// 无界相关引入
import WujieVue from "wujie-vue3";
// import lifecycles from "../wujie-config/lifecycle";
// import plugins from "../wujie-config/plugin";
import hostMap from "../wujie-config/hostMap";
import credentialsFetch from "../wujie-config/fetch";
const degrade =
  window.localStorage.getItem("degrade") === "true" ||
  !window.Proxy ||
  !window.CustomElementRegistry;
const { setupApp, bus } = WujieVue; //  preloadApp
const isProduction = process.env.NODE_ENV === "production";
const attrs = isProduction ? { src: hostMap("//localhost:8000/") } : {};
const props = {
  jump: (name: any) => {
    router.push({ name });
  }
};
app.config.globalProperties.$WujieVue = WujieVue;
app.config.globalProperties.$config;
bus.$on("click", msg => window.alert(msg));

// 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
bus.$on("sub-route-change", (name: any, path: any) => {
  const mainName = `${name}-sub`;
  const mainPath = `/${name}-sub${path}`;
  const currentName = router.currentRoute.value.name;
  const currentPath = router.currentRoute.value.path;
  if (mainName === currentName && mainPath !== currentPath) {
    router.push({ path: mainPath });
  }
});

bus.$on("sub-request-fullscreen", () => {
  toggle();
});

app.use(WujieVue);

setupApp({
  name: "vue3",
  url: hostMap("//localhost:8082/"),
  attrs,
  exec: true,
  alive: true,
  plugins: [
    {
      cssExcludes: [
        "https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      ]
    }
  ],
  props,
  // 引入了的第三方样式不需要添加credentials
  fetch: (url: any, options) =>
    url.includes(hostMap("//localhost:8082/"))
      ? credentialsFetch(url, options)
      : window.fetch(url, options),
  degrade
});

setupApp({
  name: "systemManagement",
  url: hostMap("//localhost:6666/"),
  attrs,
  exec: true,
  alive: true,
  props,
  degrade
});

setupApp({
  name: "vue2",
  url: hostMap("//localhost:6100/"),
  attrs,
  alive: true,
  exec: true,
  sync: true,
  props,
  fetch: credentialsFetch,
  degrade
});

// 自定义指令
import * as directives from "@/directives";
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

// 全局注册按钮级别权限组件
import { Auth } from "@/components/ReAuth";
app.component("Auth", Auth);

getServerConfig(app).then(async config => {
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  setupStore(app);
  app.use(MotionPlugin).use(ElementPlus);
  // .use(useEcharts);
  // .use(Table);
  // .use(PureDescriptions);
  app.mount("#app");
});
