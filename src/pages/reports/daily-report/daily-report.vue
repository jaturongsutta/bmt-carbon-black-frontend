<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Daily Report</h4>
      </v-card-title>
      <v-card-text>
        <v-form ref="frmInfo">
          <v-sheet>
            <v-row class="justify-center">
              <v-col cols="12" sm="4">
                <label>Report Name</label>
                <v-select
                  v-model="form.reportName"
                  :items="reportList"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <label>Date</label>
                <n-date v-model="form.date" :rules="[rules.required]"></n-date>
              </v-col>
              <v-col cols="12" sm="2">
                <div class="mt-5">
                  <v-btn
                    prepend-icon="mdi mdi-magnify"
                    color="secondary"
                    @click="onReview"
                  >
                    <template v-slot:prepend>
                      <v-icon color="white" size="large"></v-icon>
                    </template>
                    Run
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-sheet>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
import * as dateUtils from "@/utils/date.js";
import * as apiReports from "@/api/reports.js";
import * as api from "@/api/common-master/systemparams.js";
import rules from "@/utils/rules.js";

const router = useRouter();
const Alert = inject("Alert");
const frmInfo = ref(null);
let form = ref({});
let stringUsername = ref("");
let stringPassword = ref("");
let reportList = ref([]);

onMounted(() => {
  form.value.date = dateUtils.getToday();

  apiReports.findbyReportType("Daily").then((res) => {
    const coReports = res.data;

    coReports.forEach((item) => {
      reportList.value.push({
        title: item.reportName,
        value: item.configReportId,
        path: item.path,
      });
    });
  });

  api.findbyType("REPORT_USERNAME").then((res) => {
    stringUsername.value = res.data.paramValue;
  });
  api.findbyType("REPORT_PASSWORD").then((res) => {
    stringPassword.value = res.data.paramValue;
  });
});

const onReview = async () => {
  const { valid } = await frmInfo.value.validate();
  if (!valid) {
    return;
  }

  let coReport = reportList.value.findLast(
    (x) => x.value == form.value.reportName
  );
  console.log("coReport", coReport.path);
  openReport(coReport.path);
};

const openReport = async (path) => {
  //open report
  let login = `${stringUsername.value}:${stringPassword.value}@`;
  let url = path.replace("://", "://" + login);
  url = url + "&Date=" + form.value.date;
  window.open(url, "_blank");
};
</script>
