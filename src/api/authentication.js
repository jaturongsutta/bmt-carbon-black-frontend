import axios from "@/utils/axios";
import { useAuthStore } from "@/stores/auth";
export const authLogin = async (username, password) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.post("/auth/login", { username, password });

    // const response = {
    //   data: {
    //     status: 0,
    //     token: "xxx",
    //     user: {
    //       id: 1,
    //       username: "admin",
    //       email: "",
    //     },
    //     permission: {
    //       data: [],
    //     },
    //   },
    // };

    if (response.data.status == 2) {
      return { status: 2 };
    }

    localStorage.setItem("jwt", response.data.token);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + response.data.token;

    const user = response.data.user;
    const permission = response.data.permission.data;

    // set store
    authStore.setUser(user);
    authStore.setPermission(permission);
    authStore.setIsLogin(true);

    console.log("set isLogin", true);
    sessionStorage.setItem("isLogin", true);

    return response.data;
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
