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
            <n-date v-model="form.date"></n-date>
          </v-col>
          <v-col>
            <label>Line Tank</label>
            <n-select
              v-model="form.line"
              :items="[{ text: 'All', value: null }, ...lineTankList]"
            ></n-select>
          </v-col>
          <v-col>
            <label>Product Name</label>
            <n-select
              v-model="form.product"
              :items="[{ text: 'All', value: null }, ...productList]"
            ></n-select>
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
import * as api from "@/api/tank-shipping.js";
import * as ddlApi from "@/api/dropdown-list.js";
import { getPaging } from "@/utils/utils.js";
const router = useRouter();
const Alert = inject("Alert");
let form = ref({
  date: null,
  line: null,
  product: null,
});

const lineTankList = ref([]);

let productList = ref([]);

const headers = [
  { title: "", key: "action", width: "100px", sortable: false },
  { title: "Date", key: "date", sortable: false },
  { title: "Line-Tank", key: "lineTank", sortable: false },
  { title: "Grade", key: "grade", sortable: false },
  { title: "Product Name", key: "productName", sortable: false },
  { title: "Shipping Type", key: "shippingType", sortable: false },
  { title: "Class", key: "class", sortable: false },
  { title: "Lot No.", key: "lotNo", sortable: false },
  { title: "Packing Weight(Kg.)", key: "packingWeight", sortable: false },
  { title: "Total Qty (Kg.)", key: "totalQty", sortable: false },
];
let items = ref([]);

let isLoading = ref(false);
let currentPage = ref(1);
let pageSize = ref(20);
let totalItems = ref(3);

onMounted(() => {
  ddlApi.lineTank().then((res) => {
    lineTankList.value = res.data;
  });

  ddlApi.product().then((res) => {
    productList.value = res.data;
  });
});

const loadData = async (paginate) => {
  const { page, itemsPerPage } = paginate;

  const searchOptions = getPaging({ page, itemsPerPage });

  try {
    isLoading.value = true;
    const data = {
      ...form.value,
      searchOptions,
    };

    const response = await api.search(data);

    items.value = response.data;
    totalItems.value = response.total_record;
  } catch (error) {
    console.error("Error fetching API:", error);
    items.value = [];
    totalItems.value = 0;
  }
  isLoading.value = false;
};

const onSearch = async () => {
  currentPage.value = 1;
  loadData({ page: currentPage.value, itemsPerPage: pageSize.value });
};

const onReset = () => {
  form.value = {
    date: null,
    line: null,
    product: null,
  };
  onSearch();
};

const onAdd = () => {
  router.push({
    name: "tank-shipping-info",
    query: {
      date: form.value.date,
    },
  });
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
