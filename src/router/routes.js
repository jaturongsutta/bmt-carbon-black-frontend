const routes = [
  {
    path: "/",
    name: "/",
    component: () => import("@/pages/home.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/home.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/menu-list",
    name: "menu",
    component: () => import("@/pages/common-master/menu/menu-list.vue"),
    meta: {
      requireAuth: true,
      menuNo: "M1018",
    },
  },
  {
    path: "/menu-info",
    name: "menu-info",
    component: () => import("@/pages/common-master/menu/menu-info.vue"),
    meta: {
      requireAuth: true,
      menuNo: "M1018",
    },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/pages/users.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
  },
];

export default routes;
