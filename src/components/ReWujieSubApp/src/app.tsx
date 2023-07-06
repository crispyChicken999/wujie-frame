import { computed, defineComponent } from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import { useUserStoreHook } from "@/store/modules/user";
import { getToken } from "@/utils/auth";
import { useRoute, useRouter } from "vue-router";
import WujieVue from "wujie-vue3";

const routeConverter = (route: string) => {
  return route.startsWith("/") ? route : `/${route}`;
};

export default defineComponent({
  name: "WujieSubApp",
  props: {
    entryHost: {
      type: String,
      required: false,
      default: ""
    },
    entryRoute: {
      type: String,
      required: false,
      default: ""
    },
    width: {
      type: String,
      required: false,
      default: "100%"
    },
    height: {
      type: String,
      required: false,
      default: "100%"
    },
    name: {
      type: String,
      required: true,
      default: "wujie-sub-app"
    },
    sync: {
      type: Boolean,
      required: false,
      default: false
    },
    fetch: {
      type: Function,
      required: false
    },
    beforeLoad: {
      type: Function,
      required: false
    },
    beforeMount: {
      type: Function,
      required: false
    },
    afterMount: {
      type: Function,
      required: false
    },
    beforeUnmount: {
      type: Function,
      required: false
    },
    afterUnmount: {
      type: Function,
      required: false
    },
    degrade: {
      type: Boolean,
      required: false,
      default: false
    },
    ssoEnable: {
      type: Boolean,
      required: false,
      default: true
    },
    isIntegratedSubApp: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props: subAppProps) {
    /** 主题相关 */
    const { dataTheme, layoutTheme } = useDataThemeChange();

    /** 默认的子应用入口HOST */
    const { VITE_SUB_APP_HOST } = import.meta.env;

    /** 路由相关 */
    const route = useRoute();
    const router = useRouter();

    /**
     * 主应用跳转到对应的子应用（由子应用通过 window.$wujie?.props.jump 调用）
     * @param location { path: "/pathB" }
     * @param query 'to=xxx&xxx=xxx'
     */
    const jump = (location: object, query: string | URLSearchParams) => {
      router.push(location);
      const url = new URL(window.location.href);
      url.search =
        typeof query === "string"
          ? query
          : new URLSearchParams(query).toString();
      // 手动的挂载url查询参数
      window.history.replaceState(history.state, "", url.href);
    };

    /** 获取路由query中to的参数值 */
    const defaultEntryRoute = (route.query?.to as string) ?? "";

    /**
     * 将route.query中的参数进行过滤，去除to参数，其他参数保留
     */
    const restQueryWithoutTo = Object.entries(route.query).reduce(
      (acc: object, [key, value]) => {
        if (key !== "to") {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    /** route.query中是否除了to以外就没有其他参数了（基于restQueryWithoutTo） */
    const isRestQueryEmpty = Object.keys(restQueryWithoutTo).length === 0;

    /** 决定子应用重定向过程中是否带上query（基于isRestQueryEmpty [true 不带 || false 携带]）
     * @reason 为了避免子应用在重定向过程中带上了单点登录的参数，导致子应用breadCrumb显示异常
     */
    const redirectType = computed(() => {
      return isRestQueryEmpty ? "redirectWithoutQuery" : "redirect";
    });

    /** 子应用的入口HOST配置，不传则默认为环境变量env中的设置 */
    const entryHost = props.entryHost || VITE_SUB_APP_HOST;

    /**
     * 子应用的入口路由配置，存在多种情况
     * 1. 如果子系统不是基于配套wujie-sub-app开发，则将entryRoute（必传）设置为子系统的入口路由
     * 2. 如果props传入 entryRoute，则将entryRoute设置为子系统的入口路由
     * 3. 如果props没有传入entryRoute，则获取路由中的to参数，将to参数设置为子系统的入口路由
     * 4. 兜底情况，默认设置 /welcome 为子系统的入口路由
     */
    const entryRoute =
      (!props.isIntegratedSubApp && props.entryRoute) ||
      (props.entryRoute &&
        `/#/${redirectType.value}${routeConverter(props.entryRoute)}`) ||
      (defaultEntryRoute &&
        `/#/${redirectType.value}${routeConverter(defaultEntryRoute)}`) ||
      `/#/${redirectType.value}/welcome`;

    /**
     * 子系统的入口路由需要带上的参数
     * 1. userName: 当前登录用户的用户名
     * 2. roles: 当前登录用户的角色
     * 3. accessToken: 当前登录用户的accessToken
     * 4. 其他参数：子系统的入口路由可能需要其他参数，这里将路由中的其他参数都带上
     */
    const params = new URLSearchParams({
      userName: useUserStoreHook()?.username,
      roles: useUserStoreHook()?.roles?.join(","),
      accessToken: getToken().accessToken,
      ...restQueryWithoutTo
    }).toString();

    /** 子系统的入口URL */
    const url = `${entryHost}${entryRoute}${
      props.ssoEnable ? `?${params}` : ""
    }`;

    /**
     * 构建主应用与子应用的通信
     * 1. 若props传入了entryRoute，则通知子应用跳转到指定路由
     * 2. 否则获取路由中的to参数，通知子应用跳转到指定路由
     */
    const { bus } = WujieVue;
    defaultEntryRoute &&
      bus.$emit("routeChange", routeConverter(defaultEntryRoute));
    props.entryRoute &&
      bus.$emit("routeChange", routeConverter(props.entryRoute));

    return () => {
      const wujieProps = {
        width: props.width,
        height: props.height,
        name: props.name,
        url,
        sync: props.sync,
        fetch: props.fetch,
        props: {
          dataTheme,
          layoutTheme,
          jump
        },
        degrade: props.degrade,
        beforeLoad: props.beforeLoad,
        beforeMount: props.beforeMount,
        afterMount: props.afterMount,
        beforeUnmount: props.beforeUnmount,
        afterUnmount: props.afterUnmount
      };

      return <WujieVue {...wujieProps} />;
    };
  }
});
