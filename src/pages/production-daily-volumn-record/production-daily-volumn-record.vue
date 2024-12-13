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
            <n-date v-model="form.date"></n-date>
          </v-col>
          <v-col>
            <label>Line</label>
            <v-select
              v-model="form.line"
              :items="[{ title: 'All', value: null }, ...lineList]"
            ></v-select>
          </v-col>
          <v-col>
            <label>Grade</label>
            <v-select
              v-model="form.grade"
              :items="[{ title: 'All', value: null }, ...gradeList]"
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
              <th rowspan="2" style="min-width: 150px">Tank</th>

              <th colspan="3">Feedstock Oil</th>
              <th colspan="6">Fuel</th>
              <th colspan="2">Summarize Carbon</th>
              <th rowspan="2">KOH Mixing</th>
              <th rowspan="2">NaOH Consumption</th>
              <th rowspan="2">Recyde Hopper Level</th>
              <th rowspan="2" style="min-width: 150px">Tank</th>

              <th colspan="3">Feedstock Oil</th>
              <th colspan="6">Fuel</th>
              <th colspan="2">Summarize Carbon</th>
              <th rowspan="2">KOH Mixing</th>
              <th rowspan="2">NaOH Consumption</th>
              <th rowspan="2">Recyde Hopper Level</th>
              <th rowspan="2" style="min-width: 150px">Tank</th>
            </tr>
            <tr>
              <th>Production</th>
              <th>EKINEN</th>
              <th>Total</th>
              <th>Production</th>
              <th>Warm up</th>
              <th>Preheat</th>
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
              <th>Preheat</th>
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
              <th>Preheat</th>
              <th>Drying</th>
              <th>Liquid</th>
              <th>Oil spray check</th>
              <th>Total Mixing Volumn</th>
              <th>Dischargen Volumn</th>
            </tr>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <n-gbtn-view
              v-if="moment().diff(moment.utc(item.Date), 'days') > 10"
              @click="onView(item.Prod_Daily_Id)"
            ></n-gbtn-view>
            <n-gbtn-edit
              v-else
              @click="onEdit(item.Prod_Daily_Id)"
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
import { useRouter } from "vue-router";
import moment from "moment";
import * as api from "@/api/production-daily-volumn-record.js";
import * as ddlApi from "@/api/dropdown-list.js";
import { getPaging } from "@/utils/utils.js";
import numeral from "numeral";

import * as dateUtils from "@/utils/date.js";

const router = useRouter();
const Alert = inject("Alert");
let form = ref({});

let gradeList = ref([]);
let lineList = ref([]);

let productList = ref([]);

const headers = [
  { title: "", key: "action", sortable: false },
  {
    title: "Date",
    key: "Date",
    value: (item) => {
      return item.Date ? moment(item.Date).utc().format("DD/MM/YYYY") : "";
    },
  },
  { title: "Line", key: "Line" },
  { title: "Grade", key: "Grade" },
  { title: "Product Name", key: "Product_Name" },

  //** Shift 1 */
  {
    title: "Production",
    key: "S1_1_Production_Prod_Total",
    value: ({ S1_1_Production_Prod_Total }) =>
      numberFormat(S1_1_Production_Prod_Total),
  },
  {
    title: "EKINEN",
    key: "S1_1_EKINEN_EKN_Total",
    value: ({ S1_1_EKINEN_EKN_Total }) => numberFormat(S1_1_EKINEN_EKN_Total),
  },
  {
    title: "Total",
    key: "S1_1_PRODUCTION_EKINEN_Total",
    value: ({ S1_1_PRODUCTION_EKINEN_Total }) =>
      numberFormat(S1_1_PRODUCTION_EKINEN_Total),
  },
  {
    title: "Production",
    key: "S1_2_NG_Production",
    value: ({ S1_2_NG_Production }) => numberFormat(S1_2_NG_Production),
  },
  {
    title: "Warm up",
    key: "S1_2_NG_Warm_up",
    value: ({ S1_2_NG_Warm_up }) => numberFormat(S1_2_NG_Warm_up),
  },
  {
    title: "Preheat",
    key: "S1_2_NG_Preheat",
    value: ({ S1_2_NG_Preheat }) => numberFormat(S1_2_NG_Preheat),
  },
  {
    title: "Drying",
    key: "S1_2_NG_Drying",
    value: ({ S1_2_NG_Drying }) => numberFormat(S1_2_NG_Drying),
  },
  {
    title: "Liquid",
    key: "liquid1",
    value: (item) => {
      return numberFormat(
        convertToInt(item.S1_2_FCC_Preheat) +
          convertToInt(item.S1_2_EBO_Preheat) +
          convertToInt(item.S1_2_CBO_Preheat)
      );
    },
  },
  {
    title: "Oil spray check",
    key: "S1_2_NG_Oil_Spray_checking",
    value: ({ S1_2_NG_Oil_Spray_checking }) =>
      numberFormat(S1_2_NG_Oil_Spray_checking),
  },
  {
    title: "Total Mixing Volumn",
    key: "S1_3_Total_Mixing_Volume_Other",
    value: ({ S1_3_Total_Mixing_Volume_Other }) =>
      numberFormat(S1_3_Total_Mixing_Volume_Other),
  },
  {
    title: "Dischargen Volumn",
    key: "S1_3_Discharged_Volume_Other",
    value: ({ S1_3_Discharged_Volume_Other }) =>
      numberFormat(S1_3_Discharged_Volume_Other),
  },
  {
    title: "KOH Mixing",
    key: "S1_3_KOH_Mixing_Other",
    value: ({ S1_3_KOH_Mixing_Other }) => numberFormat(S1_3_KOH_Mixing_Other),
  },
  {
    title: "NaOH Consumption",
    key: "S1_3_NaOH_Consumption_Other",
    value: ({ S1_3_NaOH_Consumption_Other }) =>
      numberFormat(S1_3_NaOH_Consumption_Other),
  },
  {
    title: "Recycle Hopper Level",
    key: "S1_3_Recycle_Hopper_Level_Other",
    value: ({ S1_3_Recycle_Hopper_Level_Other }) =>
      numberFormat(S1_3_Recycle_Hopper_Level_Other),
  },
  { title: "Tank", key: "S1_4_Tank" },

  //** Shift 2 */
  {
    title: "Production",
    key: "S2_1_Production_Prod_Total",
    value: ({ S2_1_Production_Prod_Total }) =>
      numberFormat(S2_1_Production_Prod_Total),
  },
  {
    title: "EKINEN",
    key: "S2_1_EKINEN_EKN_Total",
    value: ({ S2_1_EKINEN_EKN_Total }) => numberFormat(S2_1_EKINEN_EKN_Total),
  },
  {
    title: "Total",
    key: "S2_1_PRODUCTION_EKINEN_Total",
    value: ({ S2_1_PRODUCTION_EKINEN_Total }) =>
      numberFormat(S2_1_PRODUCTION_EKINEN_Total),
  },
  {
    title: "Production",
    key: "S2_2_NG_Production",
    value: ({ S2_2_NG_Production }) => numberFormat(S2_2_NG_Production),
  },
  {
    title: "Warm up",
    key: "S2_2_NG_Warm_up",
    value: ({ S2_2_NG_Warm_up }) => numberFormat(S2_2_NG_Warm_up),
  },
  {
    title: "Preheat",
    key: "S2_2_NG_Preheat",
    value: ({ S2_2_NG_Preheat }) => numberFormat(S2_2_NG_Preheat),
  },
  {
    title: "Drying",
    key: "S2_2_NG_Drying",
    value: ({ S2_2_NG_Drying }) => numberFormat(S2_2_NG_Drying),
  },
  {
    title: "Liquid",
    key: "liquid2",
    value: (item) => {
      return numberFormat(
        convertToInt(item.S2_2_FCC_Preheat) +
          convertToInt(item.S2_2_EBO_Preheat) +
          convertToInt(item.S2_2_CBO_Preheat)
      );
    },
  },
  {
    title: "Oil spray check",
    key: "S2_2_NG_Oil_Spray_checking",
    value: ({ S2_2_NG_Oil_Spray_checking }) =>
      numberFormat(S2_2_NG_Oil_Spray_checking),
  },
  {
    title: "Total Mixing Volumn",
    key: "S2_3_Total_Mixing_Volume_Other",
    value: ({ S2_3_Total_Mixing_Volume_Other }) =>
      numberFormat(S2_3_Total_Mixing_Volume_Other),
  },
  {
    title: "Dischargen Volumn",
    key: "S2_3_Discharged_Volume_Other",
    value: ({ S2_3_Discharged_Volume_Other }) =>
      numberFormat(S2_3_Discharged_Volume_Other),
  },
  {
    title: "KOH Mixing",
    key: "S2_3_KOH_Mixing_Other",
    value: ({ S2_3_KOH_Mixing_Other }) => numberFormat(S2_3_KOH_Mixing_Other),
  },
  {
    title: "NaOH Consumption",
    key: "S2_3_NaOH_Consumption_Other",
    value: ({ S2_3_NaOH_Consumption_Other }) =>
      numberFormat(S2_3_NaOH_Consumption_Other),
  },
  {
    title: "Recycle Hopper Level",
    key: "S2_3_Recycle_Hopper_Level_Other",
    value: ({ S2_3_Recycle_Hopper_Level_Other }) =>
      numberFormat(S2_3_Recycle_Hopper_Level_Other),
  },
  { title: "Tank", key: "S2_4_Tank" },

  //** Shift 3 */
  {
    title: "Production",
    key: "S3_1_Production_Prod_Total",
    value: ({ S3_1_Production_Prod_Total }) =>
      numberFormat(S3_1_Production_Prod_Total),
  },
  {
    title: "EKINEN",
    key: "S3_1_EKINEN_EKN_Total",
    value: ({ S3_1_EKINEN_EKN_Total }) => numberFormat(S3_1_EKINEN_EKN_Total),
  },
  {
    title: "Total",
    key: "S3_1_PRODUCTION_EKINEN_Total",
    value: ({ S3_1_PRODUCTION_EKINEN_Total }) =>
      numberFormat(S3_1_PRODUCTION_EKINEN_Total),
  },
  {
    title: "Production",
    key: "S3_2_NG_Production",
    value: ({ S3_2_NG_Production }) => numberFormat(S3_2_NG_Production),
  },
  {
    title: "Warm up",
    key: "S3_2_NG_Warm_up",
    value: ({ S3_2_NG_Warm_up }) => numberFormat(S3_2_NG_Warm_up),
  },
  {
    title: "Preheat",
    key: "S3_2_NG_Preheat",
    value: ({ S3_2_NG_Preheat }) => numberFormat(S3_2_NG_Preheat),
  },
  {
    title: "Drying",
    key: "S3_2_NG_Drying",
    value: ({ S3_2_NG_Drying }) => numberFormat(S3_2_NG_Drying),
  },
  {
    title: "Liquid",
    key: "liquid3",
    value: (item) => {
      return numberFormat(
        convertToInt(item.S3_2_FCC_Preheat) +
          convertToInt(item.S3_2_EBO_Preheat) +
          convertToInt(item.S3_2_CBO_Preheat)
      );
    },
  },
  {
    title: "Oil spray check",
    key: "S3_2_NG_Oil_Spray_checking",
    value: ({ S3_2_NG_Oil_Spray_checking }) =>
      numberFormat(S3_2_NG_Oil_Spray_checking),
  },
  {
    title: "Total Mixing Volumn",
    key: "S3_3_Total_Mixing_Volume_Other",
    value: ({ S3_3_Total_Mixing_Volume_Other }) =>
      numberFormat(S3_3_Total_Mixing_Volume_Other),
  },
  {
    title: "Dischargen Volumn",
    key: "S3_3_Discharged_Volume_Other",
    value: ({ S3_3_Discharged_Volume_Other }) =>
      numberFormat(S3_3_Discharged_Volume_Other),
  },
  {
    title: "KOH Mixing",
    key: "S3_3_KOH_Mixing_Other",
    value: ({ S3_3_KOH_Mixing_Other }) => numberFormat(S3_3_KOH_Mixing_Other),
  },
  {
    title: "NaOH Consumption",
    key: "S3_3_NaOH_Consumption_Other",
    value: ({ S3_3_NaOH_Consumption_Other }) =>
      numberFormat(S3_3_NaOH_Consumption_Other),
  },
  {
    title: "Recycle Hopper Level",
    key: "S3_3_Recycle_Hopper_Level_Other",
    value: ({ S3_3_Recycle_Hopper_Level_Other }) =>
      numberFormat(S3_3_Recycle_Hopper_Level_Other),
  },
  { title: "Tank", key: "S3_4_Tank" },
];
let items = ref([]);

let isLoading = ref(false);
let currentPage = ref(1);
let pageSize = ref(20);
let totalItems = ref(3);

onMounted(() => {
  ddlApi.getPredefine("Grade").then((res) => {
    gradeList.value = res;
  });
  ddlApi.line().then((res) => {
    lineList.value = res;
  });

  ddlApi.product().then((res) => {
    productList.value = res;
  });

  form.value.date = dateUtils.getToday();
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
    grade: null,
    productName: null,
  };
  onSearch();
};

const onAdd = () => {
  router.push({ name: "production-daily-volumn-record-add" });
};

const onView = (id) => {
  router.push({
    name: `production-daily-volumn-record-add`,
    params: { id: id },
    query: { view: "Y" },
  });
};

const onEdit = (id) => {
  router.push({
    name: `production-daily-volumn-record-add`,
    params: { id: id },
  });
};

const convertToInt = (value) => {
  return value ? parseInt(value) : 0;
};

const numberFormat = (value) => {
  return value ? numeral(value).format("0,0") : "0";
};
</script>
