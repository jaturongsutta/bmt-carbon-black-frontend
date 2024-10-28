import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import { refreshToken } from "@/api/authentication.js";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();
console.log("VITE_API_URL", import.meta.env.VITE_API_URL);

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
if (localStorage.getItem("jwt")) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("jwt");
}

axios.interceptors.request.use(
  function (config) {
    if (["post", "put", "delete"].includes(config.method)) {
      // Update Token
      const ignoreRefresh = ["/auth/"];
      if (
        axios.defaults.headers.common["Authorization"] &&
        !ignoreRefresh.some((prefix) => config.url.startsWith(prefix))
      ) {
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

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
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

      // window.location.href = "/login";
      window.location.reload();
    } else {
      console.error("axios error", error);
      notify({
        type: "error",
        text: error.message,
      });
      // Swal.fire({
      //   position: "top-end",
      //   text: error.message,
      //   timer: 1500,
      // });
    }

    return Promise.reject(error);
  }
);

export default axios;
