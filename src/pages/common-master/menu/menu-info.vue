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

      <!-- 
      <div class="row">
        <div class="col-3">
          <label>Menu No</label>
          <v-text-field v-model="form.menu_no"></v-text-field>
        </div>
        <div class="col-3">
          <label>Group Menu No</label>
          <v-text-field v-model="form.menu_no"></v-text-field>
        </div>
        <div class="col-3">
          <label>Seq</label>
          <v-text-field v-model="form.menu_no"></v-text-field>
        </div>
        <div class="col-3">
          <label>Status</label>
          <v-text-field v-model="form.menu_no"></v-text-field>
        </div>
        <div class="col-6">
          <label>Menu Name (EN)</label>
          <v-text-field v-model="form.menu_no"></v-text-field>
        </div>
        <div class="col-6">
          <label>Menu Name (TH)</label>
          <v-text-field v-model="form.menu_no"></v-text-field>
        </div>

        <div class="col-12">
          <label>Url</label>
          <v-text-field v-model="form.menu_no"></v-text-field>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <v-radio-group>
            <v-radio value="Web">
              <template v-slot:label>
                <div class="pt-2">Web</div>
              </template>
            </v-radio>
            <v-radio value="Hendheld">
              <template v-slot:label>
                <div class="pt-2">Hendheld</div>
              </template>
            </v-radio>
            <v-radio value="Tablet">
              <template v-slot:label>
                <div class="pt-2">Tablet</div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
      </div> -->
    </v-card-text>

    <n-loading :loading="isLoading" />
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
