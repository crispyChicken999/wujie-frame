const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: "加载中...",
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  },
  {
    path: "/dataCenterWithoutLayout",
    name: "dataCenterWithoutLayout",
    component: () => import("@/views/dataCenter/index.vue"),
    meta: {
      icon: "icon-park-solid:analysis",
      title: "数据中心(无布局)",
      showLink: true,
      rank: 3
    }
  }
] as Array<RouteConfigsTable>;
