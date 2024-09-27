/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
// import { registerPlugins } from "@/plugins";
// import { registerGlobalComponents } from "@/plugins/global-component";

// import alertCommon from "@/utils/alert-common.js";

// css
import "@/styles/main.css";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// const app = createApp(App);

// registerPlugins(app);

// registerGlobalComponents(app);

// app.mount("#app");

// // Initial Common function
// alertCommon.initialAlert(app);

// Plugins
import vuetify from "@/plugins/vuetify";
import pinia from "@/stores";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
pinia.use(piniaPluginPersistedstate);
import VueSweetalert2 from "vue-sweetalert2";
// Import SweetAlert2 CSS
import "sweetalert2/dist/sweetalert2.min.css";
import createAppRouter from "./router";

import alertCommon from "@/utils/alert-common.js";
import { getRouteList } from "@/router/routeService.js";
async function bootstrap() {
  const routeData = await getRouteList();
  const router = createAppRouter(routeData);
  console.log("router application ", router.getRoutes());
  const app = createApp(App);
  app.use(vuetify);
  app.use(pinia);
  app.use(router);
  app.use(VueSweetalert2);
  app.provide("Alert", alertCommon);
  app.mount("#app");
}

bootstrap();
