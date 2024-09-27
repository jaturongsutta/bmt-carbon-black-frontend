<template>
  <div>
    <v-data-table
      v-model:page="currentPage"
      :headers="headers"
      :items="items"
      :items-per-page="pageSize"
    >
      <template v-slot:[`item.action`]="{ item }">
        <n-gbtn-view @click="onView(item.filename)"></n-gbtn-view>
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
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as api from "@/api/common-master/application-log";
import { useRouter } from "vue-router";

const router = useRouter();
let isLoading = ref(false);
const headers = [
  { title: "", key: "action", sortable: false },
  { title: "Filename", key: "filename", sortable: true },
];
let items = ref([]);
let currentPage = ref(1);
let pageSize = ref(20);
let totalItems = ref(0);

onMounted(() => {
  isLoading.value = true;

  api.search().then((res) => {
    items.value = res.logCombined;
    totalItems.value = items.value.length;

    items.value.sort((a, b) => b.filename.localeCompare(a.filename));

    isLoading.value = false;
  });
});

const onView = (filename) => {
  console.log(filename);

  // const url = `/preview-log/?logtype=combined&filename=${filename}`;

  router.push({
    name: "application-log-preview",
    params: { logtype: "detail", filename: filename },
  });
};
</script>
