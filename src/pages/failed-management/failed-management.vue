<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Failed Management</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <label>Month</label>
            <v-select
              v-model="form.month"
              :items="[{ title: 'All', value: null }, ...monthList]"
            ></v-select>
          </v-col>
          <v-col>
            <label>Year</label>
            <v-select
              v-model="form.year"
              :items="[{ title: 'All', value: null }, ...yearList]"
            ></v-select>
          </v-col>
          <v-col>
            <label>Line</label>
            <v-select
              v-model="form.line"
              :items="[{ title: 'All', value: null }, ...lineList]"
            ></v-select>
          </v-col>
          <v-col>
            <label>Product Name</label>
            <v-select
              v-model="form.productName"
              :items="[{ title: 'All', value: null }, ...productList]"
            ></v-select>
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
              @click="onEdit(item.Failed_Id)"
              :permission="false"
            ></n-gbtn-edit>
            <n-gbtn-delete
              @click="onDelete(item.Failed_Id)"
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
import { useRouter } from "vue-router";
import moment from "moment";
import * as api from "@/api/failed-management.js";
import * as ddlApi from "@/api/dropdown-list.js";
import { getPaging } from "@/utils/utils.js";
import numeral from "numeral";
const router = useRouter();
const Alert = inject("Alert");
let form = ref({
  month: null,
  year: null,
  line: null,
  productName: null,
});

const lineList = ref([]);

const productList = ref([]);
const monthList = ref([]);
const yearList = ref([]);

const headers = [
  { title: "", key: "action", width: "100px", sortable: false },
  {
    title: "Month",
    key: "Month",
    sortable: false,
  },
  {
    title: "Year",
    key: "Year",
    sortable: false,
  },
  { title: "Line", key: "Line", sortable: false },
  { title: "Product Name", key: "Product_Name", sortable: false },
  {
    title: "Production Weight #2 ",
    key: "Prod_Weight_2",
    sortable: false,
    value: (item) =>
      item.Prod_Weight_2 ? numeral(item.Prod_Weight_2).format("0,0") : "",
  },
  {
    title: "Failed Value",
    key: "Failed_Value",
    sortable: false,
    value: (item) =>
      item.Failed_Value ? numeral(item.Failed_Value).format("0,0") : "",
  },
  {
    title: "Final Production #2",
    key: "Final_Prod_2",
    sortable: false,
    value: (item) =>
      item.Final_Prod_2 ? numeral(item.Final_Prod_2).format("0,0") : "",
  },
  {
    title: "Created By",
    key: "Created_By",
    sortable: false,
  },
  {
    title: "Created Date",
    key: "Created_Date",
    sortable: false,
    value: (item) => {
      return item.Created_Date
        ? moment(item.Created_Date).utc().format("DD/MM/YYYY HH:mm:ss")
        : "";
    },
  },
];
let items = ref([]);

let isLoading = ref(false);
let currentPage = ref(1);
let pageSize = ref(20);
let totalItems = ref(3);

onMounted(() => {
  ddlApi.line().then((res) => {
    lineList.value = res;
  });

  ddlApi.product().then((res) => {
    productList.value = res;
  });

  ddlApi.getMonth().then((res) => {
    monthList.value = res;
  });

  ddlApi.getYear().then((res) => {
    yearList.value = res;
  });

  onSearch();
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
    Alert.error(error.message);
  }
  isLoading.value = false;
};

const onSearch = async () => {
  currentPage.value = 1;
  loadData({ page: currentPage.value, itemsPerPage: pageSize.value });
};

const onReset = () => {
  form.value = {
    month: null,
    year: null,
    line: null,
    productName: null,
  };
  onSearch();
};

const onAdd = () => {
  router.push({
    name: "failed-management-info",
    query: {
      month: form.value.month,
      year: form.value.year,
    },
  });
};

const onEdit = (id) => {
  router.push({ name: `failed-management-info`, params: { id: id } });
};

const onDelete = (id) => {
  Alert.confirm("Are you sure you want to delete this failed value ?").then(
    ({ isConfirmed }) => {
      if (isConfirmed) {
        api
          .remove(id)
          .then((res) => {
            if (res.status === 0) {
              Alert.success("Delete successfully");
              onSearch();
            } else if (res.status === 1) {
              Alert.warning(res.message);
            } else {
              Alert.error(res.message);
            }
          })
          .catch((error) => {
            console.error("Error fetching API:", error);
            Alert.error(error.message);
          });
      }
    }
  );
};
</script>
