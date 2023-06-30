export default [
  {
    path: "/otherSystem",
    name: "otherSystem",
    component: () => import("@/views/otherSystem/index.vue"),
    meta: {
      rank: 5,
      title: "集成系统",
      icon: "system-uicons:box",
      isPoweredByWujie: true
    }
  }
] as Array<RouteConfigsTable>;
