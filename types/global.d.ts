import type {
  VNode,
  FunctionalComponent,
  PropType as VuePropType,
  ComponentPublicInstance
} from "vue";
import type { ECharts } from "echarts";
import type { IconifyIcon } from "@iconify/vue";
import type { TableColumns } from "@pureadmin/table";

/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
 */
declare global {
  /**
   * 平台的名称、版本、依赖、最后构建时间的类型提示
   */
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  /**
   * Window 的类型提示
   */
  interface Window {
    // Global vue app instance
    __APP__: App<Element>;
    webkitCancelAnimationFrame: (handle: number) => void;
    mozCancelAnimationFrame: (handle: number) => void;
    oCancelAnimationFrame: (handle: number) => void;
    msCancelAnimationFrame: (handle: number) => void;
    webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
  }

  /**
   * 打包压缩格式的类型声明
   */
  type ViteCompression =
    | "none"
    | "gzip"
    | "brotli"
    | "both"
    | "gzip-clear"
    | "brotli-clear"
    | "both-clear";

  /**
   * 全局自定义环境变量的类型声明
   * @see {@link https://yiming_chang.gitee.io/pure-admin-doc/pages/config/#%E5%85%B7%E4%BD%93%E9%85%8D%E7%BD%AE}
   */
  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_CDN: boolean;
    VITE_HIDE_HOME: string;
    VITE_COMPRESSION: ViteCompression;
    VITE_IS_SETTING_ENABLE: string;
    VITE_SUB_APP_HOST: string;
  }

  /**
   *  继承 `@pureadmin/table` 的 `TableColumns` ，方便全局直接调用
   */
  interface TableColumnList extends Array<TableColumns> {}

  /**
   * 对应 `public/serverConfig.json` 文件的类型声明
   * @see {@link https://yiming_chang.gitee.io/pure-admin-doc/pages/config/#serverconfig-json}
   */
  interface ServerConfigs {
    Version?: string;
    Title?: string;
    FixedHeader?: boolean;
    HiddenSideBar?: boolean;
    MultiTagsCache?: boolean;
    KeepAlive?: boolean;
    Locale?: string;
    Layout?: string;
    Theme?: string;
    DarkMode?: boolean;
    Grey?: boolean;
    Weak?: boolean;
    HideTabs?: boolean;
    SidebarStatus?: boolean;
    EpThemeColor?: string;
    ShowLogo?: boolean;
    ShowModel?: string;
    MenuArrowIconNoTransition?: boolean;
    CachingAsyncRoutes?: boolean;
    TooltipEffect?: Effect;
    ResponsiveStorageNameSpace?: string;
  }

  /**
   * 与 `ServerConfigs` 类型不同，这里是缓存到浏览器本地存储的类型声明
   * @see {@link https://yiming_chang.gitee.io/pure-admin-doc/pages/config/#serverconfig-json}
   */
  interface StorageConfigs {
    version?: string;
    title?: string;
    fixedHeader?: boolean;
    hiddenSideBar?: boolean;
    multiTagsCache?: boolean;
    keepAlive?: boolean;
    locale?: string;
    layout?: string;
    theme?: string;
    darkMode?: boolean;
    grey?: boolean;
    weak?: boolean;
    hideTabs?: boolean;
    sidebarStatus?: boolean;
    epThemeColor?: string;
    showLogo?: boolean;
    showModel?: string;
    username?: string;
  }

  /**
   * `responsive-storage` 本地响应式 `storage` 的类型声明
   */
  interface ResponsiveStorage {
    locale: {
      locale?: string;
    };
    layout: {
      layout?: string;
      theme?: string;
      darkMode?: boolean;
      sidebarStatus?: boolean;
      epThemeColor?: string;
    };
    configure: {
      grey?: boolean;
      weak?: boolean;
      hideTabs?: boolean;
      showLogo?: boolean;
      showModel?: string;
      multiTagsCache?: boolean;
    };
    tags?: Array<any>;
  }

  /**
   * 平台里所有组件实例都能访问到的全局属性对象的类型声明
   */
  interface GlobalPropertiesApi {
    $echarts: ECharts;
    $storage: ResponsiveStorage;
    $config: ServerConfigs;
  }

  /** 无界子应用二次封装组件的传递参数 */
  interface subAppProps {
    /**
     * 如果子应用需要使用和 VITE_SUB_APP_HOST 不一样的host可以通过这个参数传入
     */
    entryHost?: string;
    /** 无界子应用路由入口（要跳转到那个页面） */
    entryRoute?: string;
    /** 无界子应用容器宽度 */
    width?: string;
    /** 无界子应用容器高度 */
    height?: string;
    /** 无界子应用名称 */
    name: string;
    /** 是否开启路由同步模式 */
    sync?: boolean;
    /** 自定义fetch方法 */
    fetch?: Function;
    /** 生命周期钩子，加载子应用前调用 */
    beforeLoad?: Function;
    /** 生命周期钩子，子应用 mount 之前调用 */
    beforeMount?: Function;
    /** 生命周期钩子，子应用 mount 完成后调用 */
    afterMount?: Function;
    /** 生命周期钩子，子应用 unmount 之前调用 */
    beforeUnmount?: Function;
    /** 生命周期钩子，子应用 unmount 完成后调用 */
    afterUnmount?: Function;
    /** 是否使用降级模式 */
    degrade?: boolean;
    /** 是否为单点登录模式（是否将用户信息[username|roles|accessToken]传递给子应用 - 默认开启） */
    ssoEnable?: boolean;
    /** 该子系统是否基于配套的wujie-sub-app开发，如果使用的不是配套的则需手动传入false */
    isIntegratedSubApp;
  }
}
