export default [
  {
    path: "/systemManagement",
    name: "systemManagement",
    component: () => import("@/views/systemManagement/index.vue"),
    meta: {
      title: "系统管理"
    }
  }
] as Array<RouteConfigsTable>;
