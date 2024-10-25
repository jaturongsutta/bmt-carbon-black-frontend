<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Monthly Report</h4>
      </v-card-title>
      <v-card-text>
        <v-row class="justify-center">
          <v-col cols="12" sm="3"><label>Report Name</label>
            <v-select v-model="form.reportName" :items="[{ title: 'All', value: null }, ...reportList]"></v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <label>Month</label>
            <v-select v-model="form.dataMonth" :items="[{ title: 'All' , value: null }, ...monthList]"></v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <label>Year</label>
            <v-select v-model="form.dataYear" :items="[{ title: 'All', value: null }, ...yearList]"></v-select>
          </v-col>
          <v-col cols="12" sm="1">
            <div class="mt-5">
              <v-btn prepend-icon="mdi mdi-magnify" color="secondary" @click="onSearch">
                <template v-slot:prepend>
                  <v-icon color="white" size="large"></v-icon>
                </template>
                Run
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
import * as dateUtils from "@/utils/date.js";
import * as ddlApi from "@/api/dropdown-list.js";

const router = useRouter();
const Alert = inject("Alert");
let form = ref({});

let monthList = ref([]);
let yearList = ref([]);

let stringURL= ref("");
let stringUsername= ref("");
let stringPassword= ref("");

let reportList = ref([
  { title: 'Operating Time Spread  Report', value: 1 },
  { title: 'Oil Application Table Report', value: 2 },
  { title: 'Fuel Record Report', value: 3 },
  { title: 'Bagging Report', value: 4 },
  { title: 'Tank Volume Adjustment Report', value: 5 },
  { title: 'Product Production Report', value: 6 },
  { title: 'Tank Volume Remaining Report', value: 7 },
  { title: 'Full Adjustment List Report', value: 8 },
  { title: 'Monthly Management Report', value: 9 },
]);

onMounted(() => {
  ddlApi.getMonth().then((res) => {
    monthList.value = res;
  });

  ddlApi.getYear().then((res) => {
    yearList.value = res;
  });

  api.findbyType('REPORT_URL').then((res) => {
    stringURL.value = res.data.paramValue
  });
  api.findbyType('REPORT_USERNAME').then((res) => {
    stringUsername.value = res.data.paramValue
  });
  api.findbyType('REPORT_PASSWORD').then((res) => {
    stringPassword.value = res.data.paramValue
  });
});

const onSearch = async () => {
  openReport();
};

const openReport = async () => {
  //open report
  let login = `${stringUsername.value}:${stringPassword.value}@`;
  let url = stringURL.value.replace("://","://"+login);
  url = url+ '/ReportServer/Pages/ReportViewer.aspx?%2fBSCB+Report%2fMonthlyBgging&rs:Command=Render';
  window.open(url, '_blank');
};
</script>
