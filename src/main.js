/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
import { registerGlobalComponents } from "@/plugins/global-component";

// import alertCommon from "@/utils/alert-common.js";

// css
import "@/styles/main.css";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);

registerPlugins(app);

registerGlobalComponents(app);

app.mount("#app");

// // Initial Common function
// alertCommon.initialAlert(app);
