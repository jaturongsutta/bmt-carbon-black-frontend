/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import pinia from "@/stores";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
pinia.use(piniaPluginPersistedstate);
import VueSweetalert2 from "vue-sweetalert2";
// Import SweetAlert2 CSS
import "sweetalert2/dist/sweetalert2.min.css";

import alertCommon from "@/utils/alert-common.js";
import Notifications from "@kyvg/vue3-notification";
export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(VueSweetalert2)
    .use(Notifications)
    .provide("Alert", alertCommon);
}
