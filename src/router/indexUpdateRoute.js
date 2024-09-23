/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";

import { useAuthStore } from "@/stores/auth.js";
import { jwtDecode } from "jwt-decode";
// Composables
import routesData from "./routes.js";
import { refreshToken } from "@/api/authentication.js";
import { xorEncryptDecrypt } from "@/utils/data-protection.js";
import axios from "axios";
import Swal from "sweetalert2";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const requireAuth = to.meta.requireAuth;

  console.log("to.name", to.name);
  console.log("to.meta", to.meta);

  if (requireAuth === true && authStore.isLoggedIn === false) {
    await Swal.fire("Session Expired", "Please sign in to continue", "warning");
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
