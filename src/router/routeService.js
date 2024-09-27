import { xorEncryptDecrypt } from "@/utils/data-protection.js";
import router from "./index.js";
import routeStatic from "./routes.js";

async function getRouteList() {
  let routesDynamic = [];

  const menuRoutesStr = localStorage.getItem("menuRoutes");
  if (menuRoutesStr) {
    const decryptedRoutes = xorEncryptDecrypt(menuRoutesStr);
    const menuRoutes = JSON.parse(decryptedRoutes);
    const distinctMenuNo = [...new Set(menuRoutes.map((item) => item.menuNo))];
    for (let i = 0; i < distinctMenuNo.length; i++) {
      let route;
      const menuGroupNo = menuRoutes.filter(
        (item) => item.menuNo === distinctMenuNo[i]
      );
      if (menuGroupNo.length === 1) {
        const routeConfig = menuGroupNo[0];
        route = {
          path: routeConfig.routePath,
          name: routeConfig.routeName,
          component: await loadComponent(routeConfig.physicalPath),
          meta: {
            requireAuth: routeConfig.isRequireAuth,
            menuNo: routeConfig.menuNo,
            menuRouteId: routeConfig.menuRouteId,
          },
        };
        routesDynamic.push(route);
      } else if (menuGroupNo.length > 1) {
        const routeMain = menuGroupNo.find((item) => item.isMain === true);
        if (routeMain) {
          route = {
            path: routeMain.routePath,
          };
          route.children = [
            {
              path: "",
              name: routeMain.routeName,
              component: await loadComponent(routeMain.physicalPath),
              meta: {
                requireAuth: routeMain.isRequireAuth,
                menuNo: routeMain.menuNo,
                menuRouteId: routeMain.menuRouteId,
              },
            },
          ];

          const routeChild = menuGroupNo.filter(
            (item) => item.isMain === false
          );
          for (let j = 0; j < routeChild.length; j++) {
            const routeConfig = routeChild[j];
            route.children.push({
              path: routeConfig.routePath,
              name: routeConfig.routeName,
              component: await loadComponent(routeConfig.physicalPath),
              meta: {
                requireAuth: routeConfig.isRequireAuth,
                menuNo: routeConfig.menuNo,
                menuRouteId: routeConfig.menuRouteId,
              },
            });
          }

          routesDynamic.push(route);
        }
      }
    }
  }

  return [...routesDynamic, ...routeStatic];
}

async function updateRouterByRouteData(router) {
  const routeData = await getRouteList();

  for (let i = 0; i < routeData.length; i++) {
    if (router.hasRoute(routeData[i].name)) {
      router.removeRoute(routeData[i].name);
      console.warn(`Route '${routeData[i].name}' already exists. Overwriting`);
    }
    router.addRoute(routeData[i]);
  }
}

async function loadComponent(componentName) {
  return () => import(/* @vite-ignore */ `../pages/${componentName}`);
}

export { getRouteList, updateRouterByRouteData };
