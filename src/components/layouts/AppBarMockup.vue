<template>
  <v-app-bar
    class="elevation-1 position-fixed bridgestone-top-bar"
    density="compact"
  >
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="toggleMinimalMenu"
    ></v-app-bar-nav-icon>
    <img
      class="logo-sta ml-3"
      src="@/assets/imgs/logo.png"
      @click="homeClick"
    />
    <v-spacer></v-spacer>
    <v-icon
      icon="mdi mdi-account"
      class="me-2"
      color="white"
      size="large"
    ></v-icon>
    <label class="text-h6 me-2">Admin Test</label>

    <v-btn icon="mdi-logout" variant="text" @click="logoutClick"></v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";
import { inject } from "vue";
const Alert = inject("Alert");
const storeApp = useAppStore();
const router = useRouter();
const authStore = useAuthStore();

const isShow = computed(() => {
  return authStore.isLoggedIn;
});

const logoutClick = () => {
  Alert.confirm("Are you sure you want to logout?").then((c) => {
    if (c.isConfirmed) {
      // authStore.logout();
      // // window.location.reload();
      // router.push({ path: "/login" });
    }
  });
};

const userFullname = computed(() => {
  return authStore.user?.firstName + " " + authStore.user?.lastName;
});

const toggleMinimalMenu = () => {
  storeApp.minimalMenu = !storeApp.minimalMenu;
};

const homeClick = () => {
  router.push({ path: "/" });
};
</script>

<style scoped>
.bridgestone-top-bar {
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 1) 15%,
    rgba(0, 0, 0, 1) 100%
  ) !important;
  color: white;
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo-sta {
  height: 40px;
  margin-right: 16px;
}

.text-h6 {
  font-weight: bold;
  margin-right: 16px;
  color: white;
}

.v-btn {
  color: white;
}

.v-app-bar-nav-icon {
  color: rgb(0, 0, 0);
}
</style>
