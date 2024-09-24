const routes = [
  {
    path: "/",
    name: "/",
    component: () => import("@/pages/home.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/common-master/user",
    name: "user",
    component: () => import("@/pages/common-master/user/index.vue"),
  },
  {
    path: "/common-master/user-info/:id?",
    name: "user-info",
    component: () => import("@/pages/common-master/user/user-info.vue"),
  },
  {
    path: "/common-master/role-permission",
    name: "role-permission",
    component: () =>
      import("@/pages/common-master/role-permission/role-permission.vue"),
  },
  {
    path: "/common-master/predefine",
    name: "predefine",
    component: () => import("@/pages/common-master/predefine/predefine.vue"),
  },
  {
    path: "/common-master/menu",
    name: "menu",
    component: () => import("@/pages/common-master/menu/menu-list.vue"),
  },
  {
    path: "/common-master/menu-info/:id?",
    name: "menu-info",
    component: () => import("@/pages/common-master/menu/menu-info.vue"),
  },
  {
    path: "/common-master/application-log",
    name: "application-log",
    component: () =>
      import("@/pages/common-master/application-log/log-list.vue"),
  },
  {
    path: "/common-master/application-log/preview-log/:logtype/:filename",
    name: "preview-log",
    component: () =>
      import("@/pages/common-master/application-log/preview-log.vue"),
  },
];

export default routes;
