import { xorEncryptDecrypt } from "@/utils/data-protection.js";
import router from "./index.js";
const updateRoutes = (_route) => {
  const menuRoutesStr = localStorage.getItem("menuRoutes");
  if (!menuRoutesStr) return;

  const reoutes = xorEncryptDecrypt(menuRoutesStr);
  const menuRoutes = JSON.parse(reoutes);
  let allRoutes = [];
  if (_route) {
    allRoutes = _route.getRoutes();
  } else {
    allRoutes = router.getRoutes();
  }
  console.log("updateRoute");
  console.log("allRoutes : ", allRoutes);
  menuRoutes.forEach(async (routeConfig) => {
    try {
      const route = allRoutes.find((r) => r.name === routeConfig.routeName);

      console.log("fine route : ", route);
      if (route) {
        console.log("update route : ", routeConfig.routeName);

        if (route) {
          route.meta.requireAuth = routeConfig.isRequireAuth;
          route.meta.menuNo = routeConfig.menuNo;
          route.meta.menuRouteId = routeConfig.menuRouteId;
        } else {
          console.warn(
            `Route '${routeConfig.routeName}' not found in the router.`
          );
        }
      } else {
        console.warn(`Route '${routeConfig.routeName}' does not exist.`);
      }
    } catch (error) {
      console.warn(`Failed to load route '${routeConfig.routeName}':`, error);
    }
  });
};

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

async function loadComponent(componentName) {
  return () => import(/* @vite-ignore */ `../pages/${componentName}`);
}

export { fetchRoutes, updateRoutes };
