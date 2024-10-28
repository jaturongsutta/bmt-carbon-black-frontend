/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes.js";

import { useAuthStore } from "@/stores/auth.js";
import Swal from "sweetalert2";

import { routes as r } from "vue-router/auto-routes";

console.log("routes", r);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const requireAuth =
    to.meta && to.meta.requireAuth !== undefined ? to.meta.requireAuth : true;
  if (requireAuth === true && authStore.isLoggedIn === false) {
    await Swal.fire(
      "Session Expired1",
      "Please sign in to continue",
      "warning"
    );
    next({ name: "login" });
    return; // Prevent further execution to ensure next is called only once
  }

  next(); // Default case if none of the conditions above are met
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
