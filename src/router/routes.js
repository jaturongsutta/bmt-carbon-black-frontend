import Home from "@/pages/home.vue";
import Login from "@/pages/login.vue";
import tankShipping from "@/pages/tank-shipping/tank-shipping.vue";
import tankShippingInfo from "@/pages/tank-shipping/tank-shipping-info";
import failedManagement from "@/pages/failed-management/failed-management.vue";
import failedManagementInfo from "@/pages/failed-management/failed-management-info.vue";
import productionDailyVolumnRecord from "@/pages/production-daily-volumn-record/production-daily-volumn-record.vue";
import productionDailyVolumnRecordAdd from "@/pages/production-daily-volumn-record/production-daily-volumn-record-add.vue";
import dailyReport from "@/pages/reports/daily-report/daily-report.vue";
import monthlyReport from "@/pages/reports/monthly-report/monthly-report.vue";
const routes = [
  {
    path: "/",
    name: "/",
    component: Home,
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
      menuNo: "M2001",
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
        component: tankShippingInfo,
      },
    ],
  },
  {
    path: "/failed-management",
    meta: {
      menuNo: "M2002",
    },
    children: [
      {
        path: "",
        name: "failed-management",
        component: failedManagement,
      },
      {
        path: "failed-management-info/:id?",
        name: "failed-management-info",
        component: failedManagementInfo,
      },
    ],
  },
  {
    path: "/production-daily-volumn-record",
    meta: {
      requireAuth: false,
      menuNo: "M2003",
    },
    children: [
      {
        path: "",
        name: "production-daily-volumn-record",
        component: productionDailyVolumnRecord,
      },
      {
        path: "production-daily-volumn-record-add/:id?",
        name: "production-daily-volumn-record-add",
        component: productionDailyVolumnRecordAdd,
      },
    ],
  },
  {
    path: "/reports",
    meta: {
      menuNo: "M3000",
    },
    children: [
      {
        path: "daily-report",
        name: "daily-report",
        component: dailyReport,
      },
      {
        path: "monthly-report",
        name: "monthly-report",
        component: monthlyReport,
      },
    ],
  },

  {
    path: "/common-master/line",
    meta: {
      menuNo: "M1006",
    },
    children: [
      {
        path: "",
        name: "line",
        component: () => import("@/pages/line/line.vue"),
      },
    ],
  },
  {
    path: "/common-master/product",
    meta: {
      menuNo: "M1007",
    },
    children: [
      {
        path: "",
        name: "product",
        component: () => import("@/pages/product/product.vue"),
      },
    ],
  },
  {
    path: "/common-master/master-index",
    meta: {
      menuNo: "M1007",
    },
    children: [
      {
        path: "",
        name: "master-index",
        component: () => import("@/pages/master-index/master-index.vue"),
      },
    ],
  },
];

export default routes;
