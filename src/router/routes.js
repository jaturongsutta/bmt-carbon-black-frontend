const routes = [
  {
    path: "/",
    name: "/",
    component: () => import("@/pages/home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
  },
];

export default routes;
