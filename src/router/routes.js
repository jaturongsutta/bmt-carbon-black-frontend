import Home from "@/pages/home.vue";
import Login from "@/pages/login.vue";
import tankShipping1 from "@/pages/mockup/tank-shipping1/tank-shipping1.vue";
const routes = [
  {
    path: "/",
    name: "/",
    component: tankShipping1,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/common-master/user",
    meta: {
      menuNo: "M1001",
    },
    children: [
      {
        path: "",
        name: "user",
        component: () => import("@/pages/common-master/user/user-list.vue"),
      },
      {
        path: "/common-master/user-info/:id?",
        name: "user-info",
        component: () => import("@/pages/common-master/user/user-info.vue"),
      },
    ],
  },
  {
    path: "/common-master/role-permission",
    name: "role-permission",
    meta: {
      menuNo: "M1002",
    },
    component: () =>
      import("@/pages/common-master/role-permission/role-permission.vue"),
  },
  {
    path: "/common-master/predefine",
    name: "predefine",
    meta: {
      menuNo: "M1003",
    },
    component: () => import("@/pages/common-master/predefine/predefine.vue"),
  },
  {
    path: "/common-master/menu",
    meta: {
      menuNo: "M1004",
    },
    children: [
      {
        path: "",
        name: "menu",
        component: () => import("@/pages/common-master/menu/menu-list.vue"),
      },
      {
        path: "/common-master/menu-info/:id?",
        name: "menu-info",
        component: () => import("@/pages/common-master/menu/menu-info.vue"),
      },
    ],
  },
  {
    path: "/common-master/application-log",
    meta: {
      menuNo: "M1005",
    },
    children: [
      {
        path: "",
        name: "application-log",
        component: () =>
          import("@/pages/common-master/application-log/log-list.vue"),
      },
      {
        path: "/common-master/application-log/preview-log/:logtype/:filename",
        name: "application-log-preview",
        component: () =>
          import("@/pages/common-master/application-log/preview-log.vue"),
      },
    ],
  },

  /// Mockup
  {
    path: "/tank-shipping1",
    meta: {
      requireAuth: false,
    },
    children: [
      {
        path: "",
        name: "tank-shipping1",
        component: tankShipping1,
      },
      {
        path: "/tank-shipping1-info/:id?",
        name: "tank-shipping1-info",
        component: () =>
          import("@/pages/mockup/tank-shipping1/tank-shipping1-info.vue"),
      },
      {
        path: "/tank-shipping1-add",
        name: "tank-shipping1-add",
        component: () =>
          import("@/pages/mockup/tank-shipping1/tank-shipping1-add.vue"),
      },
    ],
  },
];

export default routes;
