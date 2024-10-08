<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Production Daily Volumn Record</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <label>Date</label>
            <n-date v-model="form.field1"></n-date>
          </v-col>
          <v-col>
            <label>Line</label>
            <n-select
              v-model="form.field2"
              :items="['All', '1', '2', '3']"
            ></n-select>
          </v-col>
          <v-col>
            <label>Grade</label>
            <n-select v-model="form.grade" :items="['All', 'SAF']"></n-select>
          </v-col>
          <v-col>
            <label>Product Name</label>
            <n-select v-model="form.field3" :items="ProductList"></n-select>
          </v-col>
        </v-row>

        <div class="row">
          <div class="d-flex justify-center">
            <v-btn
              prepend-icon="mdi mdi-magnify"
              color="secondary"
              @click="onSearch"
            >
              <template v-slot:prepend>
                <v-icon color="white" size="large"></v-icon>
              </template>
              Search
            </v-btn>

            <n-btn-reset @click="onReset" class="ml-3" />
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="mt-3">
      <v-card-text>
        <v-btn
          prepend-icon="mdi mdi-plus-circle-outline"
          color="primary"
          class="float-right mb-3 mr-3"
          @click="onAdd"
        >
          <template v-slot:prepend>
            <v-icon color="white" size="large"></v-icon>
          </template>
          Add
        </v-btn>
        <v-data-table
          class="n-table"
          v-model:page="currentPage"
          :headers="headers"
          :items="items"
          item-key="external_id"
          :items-per-page="pageSize"
          hover
        >
          <template
            v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }"
          >
            <tr>
              <th rowspan="3"></th>
              <th rowspan="3">Date</th>
              <th rowspan="3">Line</th>
              <th rowspan="3">Grade</th>
              <th rowspan="3">Product Name</th>
              <th colspan="15" style="height: 35px">Shift 1</th>
              <th colspan="15" style="height: 35px">Shift 2</th>
              <th colspan="15" style="height: 35px">Shift 3</th>
            </tr>
            <tr>
              <th colspan="3">Feedstock Oil</th>
              <th colspan="6">Fuel</th>
              <th colspan="2">Summarize Carbon</th>
              <th rowspan="2">KOH Mixing</th>
              <th rowspan="2">NaOH Consumption</th>
              <th rowspan="2">Recyde Hopper Level</th>
              <th rowspan="2">Tank</th>

              <th colspan="3">Feedstock Oil</th>
              <th colspan="6">Fuel</th>
              <th colspan="2">Summarize Carbon</th>
              <th rowspan="2">KOH Mixing</th>
              <th rowspan="2">NaOH Consumption</th>
              <th rowspan="2">Recyde Hopper Level</th>
              <th rowspan="2">Tank</th>

              <th colspan="3">Feedstock Oil</th>
              <th colspan="6">Fuel</th>
              <th colspan="2">Summarize Carbon</th>
              <th rowspan="2">KOH Mixing</th>
              <th rowspan="2">NaOH Consumption</th>
              <th rowspan="2">Recyde Hopper Level</th>
              <th rowspan="2">Tank</th>
            </tr>
            <tr>
              <th>Production</th>
              <th>EKINEN</th>
              <th>Total</th>
              <th>Production</th>
              <th>Warm up</th>
              <th>Prepeat</th>
              <th>Drying</th>
              <th>Liquid</th>
              <th>Oil spray check</th>
              <th>Total Mixing Volumn</th>
              <th>Dischargen Volumn</th>

              <th>Production</th>
              <th>EKINEN</th>
              <th>Total</th>
              <th>Production</th>
              <th>Warm up</th>
              <th>Prepeat</th>
              <th>Drying</th>
              <th>Liquid</th>
              <th>Oil spray check</th>
              <th>Total Mixing Volumn</th>
              <th>Dischargen Volumn</th>

              <th>Production</th>
              <th>EKINEN</th>
              <th>Total</th>
              <th>Production</th>
              <th>Warm up</th>
              <th>Prepeat</th>
              <th>Drying</th>
              <th>Liquid</th>
              <th>Oil spray check</th>
              <th>Total Mixing Volumn</th>
              <th>Dischargen Volumn</th>
            </tr>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <n-gbtn-edit
              @click="onEdit(item.id)"
              :permission="false"
            ></n-gbtn-edit>
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

const router = useRouter();
const Alert = inject("Alert");
let form = ref({});

let tankList = ref([
  { text: "1-1", value: "A" },
  { text: "1-2", value: "I" },
  { text: "1-3", value: "P" },
  { text: "2-1", value: "R" },
  { text: "2-2", value: "C" },
  { text: "All", value: null },
]);

let ProductList = ref([
  { text: "B120", value: "A" },
  { text: "B72J", value: "I" },
  { text: "B97", value: "P" },
  { text: "N550", value: "R" },
  { text: "N550G", value: "C" },
  { text: "All", value: null },
]);

const headers = [
  { title: "", key: "action", sortable: false },
  { title: "Date", key: "date" },
  { title: "Line", key: "line" },
  { title: "Grade", key: "grade" },
  { title: "Product Name", key: "productName" },
  { title: "Production", key: "production1_1" },
  { title: "EKINEN", key: "ekinen1" },
  { title: "Total", key: "total1" },
  { title: "Production", key: "production1_2" },
  { title: "Warm up", key: "warmup1" },
  { title: "Prepeat", key: "prepeat1" },
  { title: "Drying", key: "drying1" },
  { title: "Liquid", key: "liquid1" },
  { title: "Oil spray check", key: "oilSprayCheck1" },
  { title: "Total Mixing Volumn", key: "totalMixingVolumn1" },
  { title: "Dischargen Volumn", key: "dischargenVolumn1" },
  { title: "KOH Mixing", key: "kohMixing1" },
  { title: "NaOH Consumption", key: "naohConsumption1" },
  { title: "Recycle Hopper Level", key: "recycleHopperLevel1" },
  { title: "Tank", key: "tank1" },

  { title: "Production", key: "production2_1" },
  { title: "EKINEN", key: "ekinen2" },
  { title: "Total", key: "total2" },
  { title: "Production", key: "production2_2" },
  { title: "Warm up", key: "warmup2" },
  { title: "Prepeat", key: "prepeat2" },
  { title: "Drying", key: "drying2" },
  { title: "Liquid", key: "liquid2" },
  { title: "Oil spray check", key: "oilSprayCheck2" },
  { title: "Total Mixing Volumn", key: "totalMixingVolumn2" },
  { title: "Dischargen Volumn", key: "dischargenVolumn2" },
  { title: "KOH Mixing", key: "kohMixing2" },
  { title: "NaOH Consumption", key: "naohConsumption2" },
  { title: "Recycle Hopper Level", key: "recycleHopperLevel2" },
  { title: "Tank", key: "tank2" },

  { title: "Production", key: "production3_1" },
  { title: "EKINEN", key: "ekinen3" },
  { title: "Total", key: "total3" },
  { title: "Production", key: "production3_2" },
  { title: "Warm up", key: "warmup3" },
  { title: "Prepeat", key: "prepeat3" },
  { title: "Drying", key: "drying3" },
  { title: "Liquid", key: "liquid3" },
  { title: "Oil spray check", key: "oilSprayCheck3" },
  { title: "Total Mixing Volumn", key: "totalMixingVolumn3" },
  { title: "Dischargen Volumn", key: "dischargenVolumn3" },
  { title: "KOH Mixing", key: "kohMixing3" },
  { title: "NaOH Consumption", key: "naohConsumption3" },
  { title: "Recycle Hopper Level", key: "recycleHopperLevel3" },
  { title: "Tank", key: "tank3" },
];
let items = ref([
  {
    id: 1,
    date: "09/09/2024",
    line: "1",
    grade: "SAF",
    productName: "B120",
    production1_1: "24,249",
    ekinen1: "5,760",
    total1: "30,250",
    production1_2: "0",
    warmup1: "0",
    prepeat1: "0",
    drying1: "0",
    liquid1: "0",
    oilSprayCheck1: "0",
    totalMixingVolumn1: "0",
    dischargenVolumn1: "0",
    kohMixing1: "0",
    naohConsumption1: "0",
    recycleHopperLevel1: "3",
    tank1: "1-1,1-2",

    production2_1: "24,000",
    ekinen2: "5,760",
    total2: "30,160",
    production2_2: "0",
    warmup2: "0",
    prepeat2: "0",
    drying2: "0",
    liquid2: "0",
    oilSprayCheck2: "0",
    totalMixingVolumn2: "0",
    dischargenVolumn2: "0",
    kohMixing2: "0",
    naohConsumption2: "0",
    recycleHopperLevel2: "3",
    tank2: "2-1,2-2",

    production3_1: "24,470",
    ekinen3: "5,760",
    total3: "30,230",
    production3_2: "0",
    warmup3: "0",
    prepeat3: "0",
    drying3: "0",
    liquid3: "0",
    oilSprayCheck3: "0",
    totalMixingVolumn3: "0",
    dischargenVolumn3: "0",
    kohMixing3: "0",
    naohConsumption3: "0",
    recycleHopperLevel3: "3",
    tank3: "3-1,3-2",
  },
  {
    id: 2,
    date: "09/09/2024",
    line: "1",
    grade: "SAF",
    productName: "B72J",
    production1_1: "15,000",
    ekinen1: "15,000",
    total1: "15,000",
    production1_2: "0",
    warmup1: "0",
    prepeat1: "0",
    drying1: "0",
    liquid1: "0",
    oilSprayCheck1: "0",
    totalMixingVolumn1: "0",
    dischargenVolumn1: "0",
    kohMixing1: "0",
    naohConsumption1: "0",
    recycleHopperLevel1: "3",
    tank1: "1-1,1-2",

    production2_1: "0",
    ekinen2: "0",
    total2: "0",
    production2_2: "0",
    warmup2: "0",
    prepeat2: "0",
    drying2: "0",
    liquid2: "0",
    oilSprayCheck2: "0",
    totalMixingVolumn2: "0",
    dischargenVolumn2: "0",
    kohMixing2: "0",
    naohConsumption2: "0",
    recycleHopperLevel2: "3",
    tank2: "2-1,2-2",

    production3_1: "0",
    ekinen3: "0",
    total3: "0",
    production3_2: "0",
    warmup3: "0",
    prepeat3: "0",
    drying3: "0",
    liquid3: "0",
    oilSprayCheck3: "0",
    totalMixingVolumn3: "0",
    dischargenVolumn3: "0",
    kohMixing3: "0",
    naohConsumption3: "0",
    recycleHopperLevel3: "3",
    tank3: "3-1,3-2",
  },
]);

let isLoading = ref(false);
let currentPage = ref(1);
let pageSize = ref(20);
let totalItems = ref(3);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

const onSearch = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};

const onReset = () => {
  form.value = {};
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};

const onAdd = () => {
  router.push({ name: "production-daily-volumn-record-add" });
};

const onEdit = (id) => {
  router.push({
    name: `production-daily-volumn-record-add`,
    params: { id: id },
  });
};

const onDelete = (id) => {
  Alert.confirm("Are you sure you want to delete this item?").then(() => {
    console.log("Delete", id);
  });
};
</script>
