import { useAuthStore } from "@/stores/auth.js";
import { jwtDecode } from "jwt-decode";
// Composables
import { createRouter, createWebHistory } from "vue-router";
// import { routes } from 'vue-router/auto-routes'
import routes from "./routes.js";
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
  // console.log("to", to);
  // console.log("from", from);
  // console.log("authStore.isLoggedIn", authStore.isLoggedIn);
  // console.log("requireAuth", requireAuth);

  if (requireAuth === true && authStore.isLoggedIn === false) {
    await Swal.fire("Session Expired", "Please sign in to continue", "warning");
    console.log("goto login");
    next({ name: "login" });
    return; // Prevent further execution to ensure next is called only once
  }

  next(); // Default case if none of the conditions above are met
});

router.afterEach((to, from) => {
  const requireAuth = to.meta.requireAuth;
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

// Fetch route configurations from the backend
async function fetchRoutes() {
  try {
    const menuRoutesStr = localStorage.getItem("menuRoutes");
    if (!menuRoutesStr) return;

    const reoutes = xorEncryptDecrypt(menuRoutesStr);
    const menuRoutes = JSON.parse(reoutes);

    menuRoutes.forEach(async (routeConfig) => {
      try {
        if (router.hasRoute(routeConfig.routeName)) {
          const route = router.getRoutes();
          router.removeRoute(routeConfig.routeName);

          console.warn(
            `Route '${routeConfig.routeName}' already exists. Overwriting...`
          );
        }
        const route = {
          path: routeConfig.routePath,
          name: routeConfig.routeName,
          component: await loadComponent(routeConfig.physicalPath),
          meta: {
            requireAuth: routeConfig.isRequireAuth,
            menuNo: routeConfig.menuNo,
            menuRouteId: routeConfig.menuRouteId,
          },
        };
        router.addRoute(route);
      } catch (error) {
        console.warn(`Failed to load route '${routeConfig.routeName}':`, error);
      }
    });
  } catch (error) {
    console.error("Failed to load route configuration:", error);
  }
}

// Function to dynamically import components based on their names
async function loadComponent(componentName) {
  return async () =>
    await import(/* @vite-ignore */ `../pages/${componentName}`);
}

// Call fetchRoutes to initialize dynamic routes
await fetchRoutes();

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

// // Workaround for https://github.com/vitejs/vite/issues/11804
// router.onError((err, to) => {
//   if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
//     if (!localStorage.getItem("vuetify:dynamic-reload")) {
//       console.log("Reloading page to fix dynamic import error");
//       localStorage.setItem("vuetify:dynamic-reload", "true");
//       location.assign(to.fullPath);
//     } else {
//       console.error("Dynamic import error, reloading page did not fix it", err);
//     }
//   } else {
//     console.error(err);
//   }
// });

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
export { fetchRoutes };
