<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Tank Shipping</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <label>Date</label>
            <n-date v-model="form.field1"></n-date>
          </v-col>
          <v-col>
            <label>Line Tank</label>
            <n-select v-model="form.field2" :items="tankList"></n-select>
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
          class="float-right mb-3"
          @click="onAdd2"
        >
          <template v-slot:prepend>
            <v-icon color="white" size="large"></v-icon>
          </template>
          Add 2
        </v-btn>
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
          v-model:page="currentPage"
          :headers="headers"
          :items="items"
          item-key="external_id"
          :items-per-page="pageSize"
        >
          <template v-slot:[`item.action`]="{ item }">
            <n-gbtn-edit
              @click="onEdit(item.id)"
              :permission="false"
            ></n-gbtn-edit>
            <n-gbtn-delete
              @click="onDelete(item.id)"
              :permission="false"
            ></n-gbtn-delete>
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
  { title: "", key: "action", width: "100px", sortable: false },
  { title: "Date", key: "date" },
  { title: "Line-Tank", key: "lineTank" },
  { title: "Grade", key: "grade" },
  { title: "Product Name", key: "productName" },
  { title: "Shipping Type", key: "shippingType" },
  { title: "Class", key: "class" },
  { title: "Lot No.", key: "lotNo" },
  { title: "Packing Weight(Kg.)", key: "packingWeight" },
  { title: "Total Qty (Kg.)", key: "totalQty" },
];
let items = ref([
  {
    id: 1,
    date: "09/09/2024",
    lineTank: "1-1",
    grade: "SAF",
    productName: "B120",
    shippingType: "FC (Outspec)",
    class: "C",
    lotNo: "412CD8",
    packingWeight: "750",
    totalQty: "60,000",
  },
  {
    id: 2,
    date: "09/09/2024",
    lineTank: "1-2",
    grade: "SAF",
    productName: "B120",
    shippingType: "FC (Cleaning)",
    class: "X",
    lotNo: "412CD8",
    packingWeight: "10,000",
    totalQty: "85,000",
  },
  {
    id: 3,
    date: "09/09/2024",
    lineTank: "1-3",
    grade: "SAF",
    productName: "B120",
    shippingType: "PL (Outspec)",
    class: "F",
    lotNo: "412CD8",
    packingWeight: "500",
    totalQty: "10,000",
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
  router.push({ name: "tank-shipping1-add" });
};

const onAdd2 = () => {
  router.push({ name: "tank-shipping1-add2" });
};

const onEdit = (id) => {
  router.push({ name: `tank-shipping1-info`, params: { id: id } });
};

const onDelete = (id) => {
  Alert.confirm("Are you sure you want to delete this item?").then(() => {
    console.log("Delete", id);
  });
};
</script>
