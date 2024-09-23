<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <app-bar></app-bar>
      <nav-bar v-if="authStore.isLoggedIn"></nav-bar>
      <v-main class="main">
        <router-view class="pa-5"></router-view>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { authLogout, refreshToken } from "@/api/authentication";
import { useAuthStore } from "@/stores/auth";

import { useRoute } from "vue-router";
export default {
  name: "App",
  setup() {
    console.log("App setup");
    const authStore = useAuthStore();
    const route = useRoute();
    return { authStore, route };
  },
  data() {
    return {
      tokenCheckInterval: null,
      countdownExpire: 0,
      isPopopOpen: false,
    };
  },
  created() {
    console.log("App created");

    // // Clear all intervals
    // for (let i = 1; i < 99; i++) {
    //   clearInterval(i);
    // }
    // if (!this.tokenCheckInterval) {
    //   this.tokenCheckInterval = setInterval(this.checkTokenExpire, 1000); // Check every 10 seconds
    // }
    // const isLoggedIn = sessionStorage.getItem("isLogin") ?? false;
    // this.authStore.isLoggedIn = isLoggedIn;
    // if (!isLoggedIn) {
    //   this.$router.push({ name: "login" });
    // }
  },
  methods: {
    checkTokenExpire() {
      this.countdownExpire = this.getCountdownTokenExpired();
      // console.log("Countdown: ", this.countdownExpire);
      if (this.isPopopOpen) return;

      if (this.countdownExpire > 0 && Math.round(this.countdownExpire) === 30) {
        let timerInterval;
        this.isPopopOpen = true;
        this.$swal
          .fire({
            title: "Session expiration warning",
            html: `เซคชั่นกำลังจะหมดอายุใน <b>${Math.round(
              this.countdownExpire
            )}</b> วินาที คุณต้องการอยู่ในระบบต่อหรือไม่?`,
            confirmButtonText: "Yes",
            showCancelButton: true,
            cancelButtonText: "No",
            didOpen: () => {
              const timer = this.$swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Math.round(this.countdownExpire)}`;
                if (this.countdownExpire <= 0) {
                  this.$swal.close({ isDenied: true });
                }
              }, 1000);
            },
            willClose: async () => {
              clearInterval(timerInterval);
            },
          })
          .then(async (result) => {
            /* Read more about handling dismissals below */
            if (result.isDenied) {
              await this.$swal.fire(
                "Session Expired",
                "Please sign in to continue",
                "warning"
              );
              authLogout();
              this.gotoLogin();
            } else if (result.isDismissed) {
              authLogout();
              this.gotoLogin();
            } else if (result.isConfirmed) {
              refreshToken()
                .then((response) => {
                  localStorage.setItem("jwt", response.data.accessToken);
                  axios.defaults.headers.common["Authorization"] =
                    "Bearer " + response.data.accessToken;
                })
                .catch((error) => {
                  console.error("Refresh token failed : ", error);
                });
            }

            this.isPopopOpen = false;
          });
      } else if (this.route.name != "login" && this.countdownExpire < 0) {
        this.isPopopOpen = true;
        console.log("Current route name:", this.route.name);
        this.$swal
          .fire("Session Expired", "Please sign in to continue", "warning")
          .then(() => {
            authLogout();
            this.gotoLogin();
            this.isPopopOpen = false;
          });
      }
    },

    getCountdownTokenExpired() {
      const token = localStorage.getItem("jwt"); // Adjust this to where your token is stored
      if (!token) {
        return -1; // Consider expired if there's no token
      }
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        const count_down = decoded.exp - currentTime;

        return count_down;
      } catch (error) {
        console.error("Error decoding token:", error);
        return -1; // Consider expired if there's an error decoding
      }
    },

    gotoLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.main {
  background-color: #f2f2f2;
}
</style>
