<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="miniMenu"
    permanent
    class="position-fixed"
    v-if="authStore.isLoggedIn"
    :width="270"
  >
    <v-divider></v-divider>
    <v-list v-if="miniMenu" density="compact">
      <div v-for="menuItem in mainMenu" v-bind:key="menuItem.Menu_No">
        <v-list-item
          v-if="menuItem.IS_MainMenu !== 'Main Menu'"
          :to="hd.URL"
          link
        >
          <v-icon>mdi mdi-form-select1</v-icon>
          <!-- <v-list-item-title>{{ hd.Menu_Name }}</v-list-item-title> -->
        </v-list-item>
        <v-menu v-else open-on-hover location="end">
          <template v-slot:activator="{ props }">
            <v-list-item link v-bind="props">
              <v-icon>mdi mdi-form-select</v-icon>

              <!-- <v-list-item-title class="text-h6">
                {{ hd.Menu_Name }}</v-list-item-title
              > -->
            </v-list-item>
          </template>

          <v-card class="rounded-0">
            <v-card-title>{{ menuItem.Menu_Name }}</v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-item
                v-for="menu in allMenu.filter(
                  (menu) => menu.Menu_Group === menuItem.Menu_No
                )"
                :key="menu.Menu_No"
                :to="menu.URL"
                link
              >
                <v-list-item-title class="title-sub-menu">{{
                  menu.Menu_Name
                }}</v-list-item-title>
                <v-icon v-if="menu.Menu_Icon != ''">{{
                  menu.Menu_Icon
                }}</v-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-list>
    <v-list
      v-else
      v-model:opened="open"
      open-strategy="single"
      density="comfortable"
    >
      <v-list-group
        :value="menuItem.Menu_Name"
        v-for="menuItem in mainMenu"
        :key="menuItem.Menu_No"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi mdi-form-select"
            :title="menuItem.Menu_Name"
            link
          ></v-list-item>
        </template>

        <v-list-item
          v-for="subMenuItem in allMenu.filter(
            (menu) => menu.Menu_Group === menuItem.Menu_No
          )"
          :key="subMenuItem.Menu_No"
          :value="subMenuItem.Menu_No"
          :to="subMenuItem.URL"
          link
          :subtitle="subMenuItem.Menu_Name"
        ></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

import { useAppStore } from "@/stores/app";
import * as api from "@/api/common-master/auth";
const drawer = ref(true);
const rail = ref(false);

const open = ref([]);

const authStore = useAuthStore();

const appStore = useAppStore();

onMounted(() => {
  api.getMenuPermissionByUserId().then((res) => {
    authStore.setPermission(res.data);
  });
});

const allMenu = computed(() => {
  return authStore.permission == null
    ? []
    : authStore.permission.sort((a, b) => a.Menu_Seq - b.Menu_Seq);
});

const mainMenu = computed(() => {
  const menus = authStore.permission == null ? [] : authStore.permission;
  return menus.filter((menu) => menu.IS_MainMenu === "Main Menu");
});

const miniMenu = computed(() => {
  return appStore.minimalMenu;
});
</script>
