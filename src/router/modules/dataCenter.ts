const IFrame = () => import("@/layout/frameView.vue");

export default {
  path: "/dataCenter",
  redirect: "/dataCenter/index",
  meta: {
    icon: "ep:data-analysis",
    title: "数据中心(内嵌)",
    rank: 2
  },
  children: [
    {
      path: "/dataCenter/index",
      component: IFrame,
      name: "dataCenter",
      meta: {
        title: "数据中心(内嵌)",
        keepAlive: true,
        frameSrc: "http://data-center.goomaker.com"
      }
    }
  ]
} as RouteConfigsTable;
