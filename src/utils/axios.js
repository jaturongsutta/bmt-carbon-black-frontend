import axios from "axios";

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
    return response;
  },
  async (error) => {
    // Handle JWT expiration or any other error
    if (error.response && error.response.status === 401) {
      // Handle JWT expiration here (e.g., redirect to login page)
      console.log("JWT expired or invalid");

      delete axios.defaults.headers.common["Authorization"];
      // router.push("/login");

      await this.$swal.fire(
        "Session Expired",
        "Please sign in to continue",
        "warning"
      );

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axios;
