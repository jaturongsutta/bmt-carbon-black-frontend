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
];

export default routes;
