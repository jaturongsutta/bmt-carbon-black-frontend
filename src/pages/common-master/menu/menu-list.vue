<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Menu</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <label>Menu No</label>
            <v-text-field v-model="form.menu_no"></v-text-field>
          </v-col>
          <v-col>
            <label>Menu Name</label>
            <v-text-field v-model="form.menu_name"></v-text-field>
          </v-col>
          <v-col>
            <label>Status</label>
            <n-select
              v-model="form.status"
              :items="[{ text: 'All', value: null }, ...statusList]"
            ></n-select>
          </v-col>
        </v-row>

        <div class="row">
          <div class="d-flex justify-center">
            <n-btn-search @click="onSearch" />
            <n-btn-reset @click="onReset" class="ml-3" />
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="mt-3">
      <v-card-text>
        <n-btn-add label="Add Menu" @click="onAdd"></n-btn-add>
        <v-data-table
          v-model:page="currentPage"
          :headers="headers"
          :items="items"
          item-key="external_id"
          :items-per-page="pageSize"
        >
          <template v-slot:[`item.action`]="{ item }">
            <n-gbtn-edit @click="onEdit(item.Menu_No)"></n-gbtn-edit>
          </template>
          <template v-slot:bottom>
            <n-pagination
              v-model:currentPage="currentPage"
              v-model:itemPerPage="pageSize"
              v-model:totalItems="totalItems"
            ></n-pagination>
          </template>
        </v-data-table>
        <n-loading :loading="isLoading" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";

import ddlApi from "@/api/dropdown-list.js";
import { getSearch } from "@/api/common-master/menu.js";

const router = useRouter();
const Alert = inject("$Alert");
let form = ref({});

let statusList = ref([]);

const headers = [
  { title: "", key: "action", sortable: false },
  { title: "Menu No", key: "Menu_No", sortable: true },
  { title: "Seq", key: "Menu_Seq", sortable: true },
  { title: "Name(EN)", key: "Menu_Name_EN", sortable: true },
  { title: "Name(TH)", key: "Menu_Name_TH", sortable: true },
  { title: "URL", key: "URL", sortable: true },
  { title: "Status", key: "Status", sortable: true },
];
let items = ref([]);

let isLoading = ref(false);
let currentPage = ref(1);
let pageSize = ref(20);
let totalItems = ref(0);

onMounted(() => {
  ddlApi.getPredefine({ group: "Is_Active", sortby: "text" }).then((data) => {
    statusList.value = data;
  });
});

const onSearch = () => {
  currentPage.value = 1;
  isLoading.value = true;
  getSearch(form.value)
    .then((res) => {
      items.value = res.data;
      totalItems.value = items.value.length;

      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err);
      isLoading.value = false;
      Alert.Error("Error", err.message);
    });
};

const onReset = () => {
  form.value = {};
  items.value = [];
  totalItems.value = 0;
};

const onAdd = () => {
  router.push({ name: "menu-info" });
};

const onEdit = (id) => {
  router.push({ path: `/menu-info/${id}` });
};
</script>
