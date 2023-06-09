export default [
  {
    path: "/systemManagement",
    name: "systemManagement",
    component: () => import("@/views/systemManagement/index.vue"),
    meta: {
      rank: 1,
      title: "系统管理",
      icon: "ant-design:setting-twotone",
      isPoweredByWujie: true
    }
  }
] as Array<RouteConfigsTable>;
