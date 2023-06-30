// import hot from "@/assets/svg/hot.svg?component";
const IFrame = () => import("@/layout/frameView.vue");

export default {
  path: "/pure-admin-doc",
  redirect: "/pure-admin-doc/index",
  meta: {
    icon: "iconamoon:file-document-duotone",
    title: "pure-admin-doc",
    rank: 6
  },
  children: [
    {
      path: "/pure-admin-doc/index",
      name: "FrameDoc",
      component: IFrame,
      meta: {
        title: "pure-admin-doc",
        keepAlive: true,
        frameSrc: "https://yiming_chang.gitee.io/pure-admin-doc/"
      }
    }
  ]
} as RouteConfigsTable;
