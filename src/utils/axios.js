import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import { refreshToken } from "@/api/authentication.js";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
if (localStorage.getItem("jwt")) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("jwt");
}

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (["post", ["put", "delete"]].includes(response.config.method)) {
      // Update Token
      if (axios.defaults.headers.common["Authorization"]) {
        refreshToken()
          .then((resUpdateToken) => {
            localStorage.setItem("jwt", resUpdateToken.data.accessToken);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + resUpdateToken.data.accessToken;

            console.debug("Refresh token success ");
          })
          .catch((error) => {
            console.log("Refresh token failed : ", error);
          });
      }
    }

    return response;
  },
  async (error) => {
    // Handle JWT expiration or any other error
    if (error.response && error.response.status === 401) {
      // Handle JWT expiration here (e.g., redirect to login page)
      console.log("JWT expired or invalid");

      delete axios.defaults.headers.common["Authorization"];
      const authStore = useAuthStore();
      authStore.logout();
      // router.push("/login");

      await Swal.fire(
        "Session Expired axios",
        "Please sign in to continue",
        "warning"
      );

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axios;
