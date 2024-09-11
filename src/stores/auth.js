import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore("auth", {
  persist: true,
  state: () => ({
    user: {},
    permission: [],
    isLoggedIn: false,
  }),

  actions: {
    setUser(user) {
      this.user = user;
    },
    setPermission(permission) {
      this.permission = permission;
    },
    setIsLogin(payload) {
      this.isLoggedIn = payload;
    },
    logout() {
      this.user = {};
      this.permission = {};
      this.isLoggedIn = false;

      delete axios.defaults.headers.common["Authorization"];
      sessionStorage.removeItem("isLogin");
      localStorage.removeItem("jwt");
    },
  },
});
