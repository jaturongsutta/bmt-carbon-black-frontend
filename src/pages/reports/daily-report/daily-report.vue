<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Daily Report</h4>
      </v-card-title>
      <v-card-text>
        <v-sheet>
          <v-row class="justify-center">
            <v-col cols="12" sm="4">
              <label>Report Name</label>
              <v-select v-model="form.field3" :items="[{ title: 'All', value: null }, ...reportList]"></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <label>Date</label>
              <n-date v-model="form.date"></n-date>
            </v-col>
            <v-col cols="12" sm="2">
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
        </v-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
import * as dateUtils from "@/utils/date.js";
import * as api from "@/api/common-master/systemparams.js";

const router = useRouter();
const Alert = inject("Alert");
let form = ref({});
let stringURL= ref("");
let stringUsername= ref("");
let stringPassword= ref("");
let reportList = ref([
        { title: 'Production Condition Table Report', value: 1 },
        { title: 'Tank Balance Report', value: 2 },
        { title: 'Daily Management Report', value: 3 },
      ]);

onMounted(() => {
  form.value.date = dateUtils.getToday();
 
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