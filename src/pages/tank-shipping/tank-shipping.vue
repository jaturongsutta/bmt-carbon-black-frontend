<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Tank Shipping</h4>
      </v-card-title>
      <v-card-text>
        <v-form ref="frmSearch">
          <v-row>
            <v-col>
              <label>Date</label>
              <n-date v-model="form.date"></n-date>
            </v-col>
            <v-col>
              <label>Line-Tank</label>
              <v-select
                v-model="form.tank"
                :items="[{ title: 'All', value: null }, ...lineTankList]"
              ></v-select>
            </v-col>
            <v-col>
              <label>Product Name</label>
              <v-select
                v-model="form.product"
                :items="[{ title: 'All', value: null }, ...productList]"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
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
            <!-- cannot edit if item.Create_Date over 5 days -->
            <n-gbtn-view
              v-if="moment().diff(moment.utc(item.Date), 'days') > 30"
              @click="onView(item.Tank_Shipping_Id)"
            ></n-gbtn-view>
            <div v-else>
              <n-gbtn-edit @click="onEdit(item.Tank_Shipping_Id)"></n-gbtn-edit>
              <n-gbtn-delete
                @click="onDelete(item.Tank_Shipping_Id)"
              ></n-gbtn-delete>
            </div>
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
import * as api from "@/api/tank-shipping.js";
import * as ddlApi from "@/api/dropdown-list.js";
import { getPaging } from "@/utils/utils.js";
import numeral from "numeral";
import rules from "@/utils/rules.js";
import * as dateUtils from "@/utils/date.js";
const router = useRouter();
const Alert = inject("Alert");
const frmSearch = ref(null);
let form = ref({
  date: null,
  line: null,
  product: null,
});

const lineTankList = ref([]);

let productList = ref([]);
const headers = [
  { title: "", key: "action", width: "100px", sortable: false },
  {
    title: "Date",
    key: "Date",
    sortable: false,
    value: (item) =>
      item.Date ? moment.utc(item.Date).format("DD/MM/YYYY") : "",
  },
  { title: "Line-Tank", key: "Tank", sortable: false },
  // { title: "Grade", key: "Grade", sortable: false },
  { title: "Product Name", key: "Product_Name", sortable: false },
  { title: "Shipping Type", key: "Shipping_Name", sortable: false },
  { title: "Class", key: "Class", sortable: false },
  { title: "Lot No.", key: "Lot_No", sortable: false },
  {
    title: "Packing Weight(Kg.)",
    key: "Packing_Weight",
    sortable: false,
    value: (item) =>
      item.Packing_Weight ? numeral(item.Packing_Weight).format("0,0") : "",
  },
  {
    title: "Total Q'ty (Kg.)",
    key: "Total_Qty",
    sortable: false,
    value: (item) =>
      item.Total_Qty ? numeral(item.Total_Qty).format("0,0") : "",
  },
];
let items = ref([]);

let isLoading = ref(false);
let currentPage = ref(1);
let pageSize = ref(20);
let totalItems = ref(3);

onMounted(() => {
  ddlApi.lineTank().then((res) => {
    lineTankList.value = res;
  });

  ddlApi.product().then((res) => {
    productList.value = res;
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
    date: dateUtils.getToday(),
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

const onView = (id) => {
  router.push({
    name: `tank-shipping-info`,
    params: { id: id },
    query: { view: "Y" },
  });
};

const onEdit = (id) => {
  router.push({ name: `tank-shipping-info`, params: { id: id } });
};

const onDelete = (id) => {
  Alert.confirm("Are you sure you want to delete this tank ?").then(
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
