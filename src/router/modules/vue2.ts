export default [
  {
    path: "/vue2",
    name: "vue2",
    component: () => import("@/views/vue2/index.vue"),
    meta: {
      title: "vue2"
    }
  }
] as Array<RouteConfigsTable>;
