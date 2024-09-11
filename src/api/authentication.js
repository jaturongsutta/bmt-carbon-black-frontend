import axios from "@/utils/axios";
import { useAuthStore } from "@/stores/auth";
export const authLogin = async (username, password) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.post("/auth/login", { username, password });
    const data = response.data;
    console.log("response", response);
    if (data.result.status == 2) {
      return { status: 2 };
    }

    localStorage.setItem("jwt", data.token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;

    const user = data.user;
    const permission = data.permission;

    // set store
    authStore.setUser(user);
    authStore.setPermission(permission);
    authStore.setIsLogin(true);

    console.log("set isLogin", true);
    sessionStorage.setItem("isLogin", true);

    console.log("permission", permission);

    return data;
  } catch (error) {
    authStore.setIsLogin(false);
    throw error;
  }
};
export const authLogout = () => {
  const authStore = useAuthStore();

  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("jwt");

  authStore.setUser(null);
  authStore.setPermission(null);
  authStore.setIsLogin(false);
  sessionStorage.removeItem("isLogin");
};

export const authGetMenuRoute = () => {
  return axios.get("menu-route/get-menu-route-permission");
};

export const refreshToken = () => {
  return axios.get("auth/refresh-token");
};
