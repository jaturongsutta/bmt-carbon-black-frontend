<template>
  <v-card class="ma-5">
    <v-card-title>
      <h5>Menu - {{ pageMode === "add" ? "Add" : "Edit" }}</h5>
    </v-card-title>

    <v-tabs v-model="tab">
      <v-tab value="main">Information</v-tab>
      <v-tab value="route" v-if="pageMode === 'edit'">Route</v-tab>
    </v-tabs>
    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="main">
          <main-menu />
        </v-tabs-window-item>

        <v-tabs-window-item value="route"> <route-menu /> </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import mainMenu from "@/components/menu/main-menu.vue";
import routeMenu from "@/components/menu/route-menu.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

let tab = ref("main");

let pageMode = ref("add");

onMounted(() => {
  if (route.params.id) {
    pageMode.value = "edit";
  }
});
</script>
