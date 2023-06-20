export default [
  {
    path: "/vue3",
    name: "vue3",
    component: () => import("@/views/vue3/index.vue"),
    meta: {
      title: "vue3"
    }
  }
] as Array<RouteConfigsTable>;
