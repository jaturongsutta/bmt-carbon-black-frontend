import { useAuthStore } from "@/stores/auth.js";
import { jwtDecode } from "jwt-decode";
// Composables
import { createRouter, createWebHistory } from "vue-router";
import { refreshToken } from "@/api/authentication.js";
import axios from "axios";
import Swal from "sweetalert2";

function createAppRouter(routeData) {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routeData,
  });

  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const requireAuth =
      to.meta && to.meta.requireAuth !== undefined ? to.meta.requireAuth : true;
    console.log("requireAuth ", requireAuth);

    if (requireAuth === true && authStore.isLoggedIn === false) {
      await Swal.fire(
        "Session Expired",
        "Please sign in to continue",
        "warning"
      );
      next({ name: "login" });
      return; // Prevent further execution to ensure next is called only once
    }

    next(); // Default case if none of the conditions above are met
  });

  router.afterEach((to, from) => {
    const requireAuth =
      to.meta && to.meta.requireAuth !== undefined ? to.meta.requireAuth : true;
    const token = localStorage.getItem("jwt");

    if (requireAuth && token) {
      const isExpired = isTokenExpired(token);
      if (!isExpired) {
        refreshToken()
          .then((response) => {
            localStorage.setItem("jwt", response.data.accessToken);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.accessToken;
          })
          .catch((error) => {
            console.log("Refresh token failed : ", error);
          });
      }
    }
  });

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Consider expired if there's an error decoding
    }
  };

  // Workaround for https://github.com/vitejs/vite/issues/11804
  router.onError((err, to) => {
    if (
      err?.message?.includes?.("Failed to fetch dynamically imported module")
    ) {
      if (!localStorage.getItem("vuetify:dynamic-reload")) {
        console.log("Reloading page to fix dynamic import error");
        localStorage.setItem("vuetify:dynamic-reload", "true");
        location.assign(to.fullPath);
      } else {
        console.error(
          "Dynamic import error, reloading page did not fix it",
          err
        );
      }
    } else {
      console.error(err);
    }
  });

  router.isReady().then(() => {
    localStorage.removeItem("vuetify:dynamic-reload");
  });

  return router;
}

export default createAppRouter;
