import Home from "@/pages/home.vue";
import Login from "@/pages/login.vue";
import tankShipping from "@/pages/tank-shipping/tank-shipping.vue";
import productionDailyVolumnRecord from "@/pages/mockup/production-daily-volumn-record/production-daily-volumn-record.vue";
import productionDailyVolumnRecordAdd from "@/pages/mockup/production-daily-volumn-record/production-daily-volumn-record-add.vue";
const routes = [
  {
    path: "/",
    name: "/",
    component: tankShipping,
    // meta: {
    //   requireAuth: false,
    // },
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
  {
    path: "/tank-shipping",
    meta: {
      requireAuth: false,
    },
    children: [
      {
        path: "",
        name: "tank-shipping",
        component: tankShipping,
      },

      {
        path: "tank-shipping-info/:id?",
        name: "tank-shipping-info",
        component: () => import("@/pages/tank-shipping/tank-shipping-info.vue"),
      },
    ],
  },

  {
    path: "/production-daily-volumn-record",
    meta: {
      requireAuth: false,
    },
    children: [
      {
        path: "",
        name: "production-daily-volumn-record",
        component: productionDailyVolumnRecord,
      },
      {
        path: "/production-daily-volumn-record-add",
        name: "production-daily-volumn-record-add",
        component: productionDailyVolumnRecordAdd,
      },
    ],
  },
];

export default routes;
