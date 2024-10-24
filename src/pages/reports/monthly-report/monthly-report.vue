<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Monthly Report</h4>
      </v-card-title>
      <v-card-text>
        <v-row class="justify-center">
          <v-col cols="12" sm="3"><label>Report Name</label>
            <v-select v-model="form.field1" :items="[{ title: 'All', value: null }, ...reportList]"></v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <label>Month</label>
            <v-select v-model="form.field2" :items="[{ title: 'All', value: null }, ...monthList]"></v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <label>Year</label>
            <v-select v-model="form.field3" :items="[{ title: 'All', value: null }, ...yearList]"></v-select>
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

const router = useRouter();
const Alert = inject("Alert");
let form = ref({});

let monthList = ref([{ title: 'January', value: '01' },
{ title: 'February', value: '02' },
{ title: 'March', value: '03' },
{ title: 'April', value: '04' },
{ title: 'May', value: '05' },
{ title: 'June', value: '06' },
{ title: 'July', value: '07' },
{ title: 'August', value: '08' },
{ title: 'September', value: '09' },
{ title: 'October', value: '10' },
{ title: 'November', value: '11' },
{ title: 'December', value: '12' },
]);
let yearList = ref([]);

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
  form.value.date = dateUtils.getToday();
  yearList.value = GenerateYearList()
  console.log("form.value", form.value)
  console.log("year", form.value.year)
});

const onSearch = async () => {
  //open report
};


const GenerateYearList = () => {
  const currentYear = dateUtils.getCurrentYear(); // ปีปัจจุบัน
  const startYear = currentYear - 10; // 10 ปีที่แล้ว
  const endYear = currentYear + 10; // 10 ปีข้างหน้า
  let list = [];
  for (let count = startYear; count <= endYear; count++) {
    list.push({ title: count.toString(), value: count });
  }
  return list
}
</script>
