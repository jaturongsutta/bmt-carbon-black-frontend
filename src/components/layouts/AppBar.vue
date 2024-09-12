<template>
  <v-app-bar
    class="elevation-1 position-fixed"
    v-if="authStore.isLoggedIn"
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
    <label class="text-h6 me-2">{{ userFullname }}</label>

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

const logoutClick = () => {
  Alert.confirm("Are you sure you want to logout?").then((c) => {
    if (c.isConfirmed) {
      authStore.logout();
      window.location.href = "/login";
    }
  });
};

const userFullname = computed(() => {
  console.log(authStore.user);
  return authStore.user?.firstName + " " + authStore.user?.lastName;
});

const toggleMinimalMenu = () => {
  storeApp.minimalMenu = !storeApp.minimalMenu;
};
</script>
