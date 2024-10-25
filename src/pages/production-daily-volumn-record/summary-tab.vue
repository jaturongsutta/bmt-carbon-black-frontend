<template>
  <div>
    <v-row>
      <!-- <v-col md="3" class="d-flex align-center">
        <label>Shift 1, Shift 2, Shift 3</label>
      </v-col> -->
      <v-col md="3">
        <label>Total Operating Time(h)</label>
        <v-text-field v-model="Total_Operating_Time" readonly></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h5>Feedstock Oil Consumption</h5>
        <v-table class="n-table">
          <thead>
            <tr>
              <th></th>
              <th>EBO</th>
              <th>CBO</th>
              <th>FCC</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PRODUCTION</td>
              <td>{{ T1_Production_EBO }}</td>
              <td>{{ T1_Production_CBO }}</td>
              <td>{{ T1_Production_FCC }}</td>
              <td>{{ T1_Production_Prod_Total }}</td>
            </tr>
            <tr>
              <td>EKINEN</td>
              <td>{{ T1_EKINEN_EBO }}</td>
              <td>{{ T1_EKINEN_CBO }}</td>
              <td>{{ T1_EKINEN_FCC }}</td>
              <td>{{ T1_PRODUCTION_EKINEN_Total }}</td>
            </tr>
            <tr>
              <td>Production + EKINEN</td>
              <td>{{ T1_PRODUCTION_EKINEN_EBO }}</td>
              <td>{{ T1_PRODUCTION_EKINEN_CBO }}</td>
              <td>{{ T1_PRODUCTION_EKINEN_FCC }}</td>
              <td>{{ T1_PRODUCTION_EKINEN_EBO }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h5 class="mt-5">FUEL</h5>
        <v-table class="n-table">
          <thead>
            <tr>
              <th>Fuel</th>
              <th>NG</th>
              <th>EBO</th>
              <th>CBO</th>
              <th>FCC</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Production</td>
              <td>{{ T2_NG_Production }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ T2_NG_Production_Total }}</td>
            </tr>
            <tr>
              <td>Warm up</td>
              <td>{{ T2_NG_Warm_up }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ T2_NG_Warm_up_Total }}</td>
            </tr>
            <tr>
              <td>Preheat</td>
              <td>{{ T2_NG_Preheat }}</td>
              <td>{{ T2_EBO_Preheat }}</td>
              <td>{{ T2_CBO_Preheat }}</td>
              <td>{{ T2_FCC_Preheat }}</td>
              <td>{{ T2_Preheat_Total }}</td>
            </tr>
            <tr>
              <td>Drying</td>
              <td>{{ T2_NG_Drying }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ T2_NG_Drying_Total }}</td>
            </tr>
            <tr>
              <td>Oil Spray checking</td>
              <td>{{ T2_NG_Oil_Spray_checking }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ T2_NG_Oil_Spray_checking_Total }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h5 class="mt-5">Summarize Carbon</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table class="n-table mb-3">
          <thead>
            <tr>
              <th>*Mixing(KG)</th>
              <th>*Hoist(KG)</th>
              <th>*Kande(KG)</th>
              <th>Total Mixing Volumn(KG)</th>
              <th>Discharged Volumn(KG)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ T3_Mixing_Other }}</td>
              <td>{{ T3_Hoist_Other }}</td>
              <td>{{ T3_Kande_Other }}</td>
              <td>{{ T3_Total_Mixing_Volume_Other }}</td>
              <td>{{ T3_Discharged_Volume_Other }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="3">
        <label>KOH Mixing(Litres)</label>
        <v-text-field readonly v-model="T3_KOH_Mixing_Other"></v-text-field>
      </v-col>
      <v-col md="3">
        <label>NaOH Consumption(Litres)</label>
        <v-text-field
          readonly
          v-model="T3_NaOH_Consumption_Other"
        ></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Recycle Hopper Level(%)</label>
        <v-text-field
          readonly
          v-model="T3_Recycle_Hopper_Level_Other"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex align-end">
        <h5 class="float-start">Storange Tank</h5>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table class="n-table mt-2 mb-3">
          <thead>
            <tr>
              <th>Shift</th>
              <th>Tank</th>
              <th>Start Time</th>
              <th>Stop Time</th>
              <th>Reason</th>
              <th>Full Tank</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in storageTanks">
              <td>{{ item.Shift }}</td>
              <td>{{ item.Tank }}</td>
              <td>{{ item.Tank_Start_Time }}</td>
              <td>{{ item.Tank_Stop_Time }}</td>
              <td>{{ item.Reason }}</td>
              <td>
                <v-checkbox
                  hide-details
                  value="Y"
                  v-model="item.Full_Tank"
                  readonly
                ></v-checkbox>
              </td>
            </tr>
          </tbody> </v-table
      ></v-col>
    </v-row>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits, watch, computed } from "vue";
import numeral from "numeral";
// Define props
const props = defineProps({
  modelValueShift1: {
    type: Object,
    default: () => ({}),
  },
  modelValueShift2: {
    type: Object,
    default: () => ({}),
  },
  modelValueShift3: {
    type: Object,
    default: () => ({}),
  },
});

// Define emits
const emit = defineEmits([
  "update:modelValueShift1",
  "update:modelValueShift2",
  "update:modelValueShift3",
]);

// Reactive form objects for each shift
const formShift1 = reactive(props.modelValueShift1);
const formShift2 = reactive(props.modelValueShift2);
const formShift3 = reactive(props.modelValueShift3);

watch(
  () => props.modelValueShift1,
  (newValue) => {
    Object.assign(formShift1, newValue);
  },
  { immediate: true }
);

watch(
  () => props.modelValueShift2,
  (newValue) => {
    Object.assign(formShift2, newValue);
  },
  { immediate: true }
);

watch(
  () => props.modelValueShift3,
  (newValue) => {
    Object.assign(formShift3, newValue);
  },
  { immediate: true }
);

const convertToInteger = (value) => {
  return parseInt(value) || 0;
};

// calculate summary

const Total_Operating_Time = computed(() => {
  return numeral(
    convertToInteger(formShift1.Shift_Oper_Time) +
      convertToInteger(formShift2.Shift_Oper_Time) +
      convertToInteger(formShift3.Shift_Oper_Time)
  ).format("0,0");
});
const T1_Production_EBO = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_Production_EBO) +
      convertToInteger(formShift2.T1_Production_EBO) +
      convertToInteger(formShift3.T1_Production_EBO)
  ).format("0,0");
});

const T1_Production_CBO = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_Production_CBO) +
      convertToInteger(formShift2.T1_Production_CBO) +
      convertToInteger(formShift3.T1_Production_CBO)
  ).format("0,0");
});

const T1_Production_FCC = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_Production_FCC) +
      convertToInteger(formShift2.T1_Production_FCC) +
      convertToInteger(formShift3.T1_Production_FCC)
  ).format("0,0");
});

const T1_Production_Prod_Total = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_Production_Prod_Total) +
      convertToInteger(formShift2.T1_Production_Prod_Total) +
      convertToInteger(formShift3.T1_Production_Prod_Total)
  ).format("0,0");
});

const T1_EKINEN_EBO = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_EKINEN_EBO) +
      convertToInteger(formShift2.T1_EKINEN_EBO) +
      convertToInteger(formShift3.T1_EKINEN_EBO)
  ).format("0,0");
});

const T1_EKINEN_CBO = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_EKINEN_CBO) +
      convertToInteger(formShift2.T1_EKINEN_CBO) +
      convertToInteger(formShift3.T1_EKINEN_CBO)
  ).format("0,0");
});

const T1_EKINEN_FCC = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_EKINEN_FCC) +
      convertToInteger(formShift2.T1_EKINEN_FCC) +
      convertToInteger(formShift3.T1_EKINEN_FCC)
  ).format("0,0");
});

const T1_PRODUCTION_EKINEN_Total = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_PRODUCTION_EKINEN_Total) +
      convertToInteger(formShift2.T1_PRODUCTION_EKINEN_Total) +
      convertToInteger(formShift3.T1_PRODUCTION_EKINEN_Total)
  ).format("0,0");
});

const T1_PRODUCTION_EKINEN_EBO = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_PRODUCTION_EKINEN_EBO) +
      convertToInteger(formShift2.T1_PRODUCTION_EKINEN_EBO) +
      convertToInteger(formShift3.T1_PRODUCTION_EKINEN_EBO)
  ).format("0,0");
});

const T1_PRODUCTION_EKINEN_CBO = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_PRODUCTION_EKINEN_CBO) +
      convertToInteger(formShift2.T1_PRODUCTION_EKINEN_CBO) +
      convertToInteger(formShift3.T1_PRODUCTION_EKINEN_CBO)
  ).format("0,0");
});

const T1_PRODUCTION_EKINEN_FCC = computed(() => {
  return numeral(
    convertToInteger(formShift1.T1_PRODUCTION_EKINEN_FCC) +
      convertToInteger(formShift2.T1_PRODUCTION_EKINEN_FCC) +
      convertToInteger(formShift3.T1_PRODUCTION_EKINEN_FCC)
  ).format("0,0");
});

const T2_NG_Production = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_NG_Production) +
      convertToInteger(formShift2.T2_NG_Production) +
      convertToInteger(formShift3.T2_NG_Production)
  ).format("0,0");
});

const T2_NG_Production_Total = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_NG_Production_Total) +
      convertToInteger(formShift2.T2_NG_Production_Total) +
      convertToInteger(formShift3.T2_NG_Production_Total)
  ).format("0,0");
});

const T2_NG_Warm_up = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_NG_Warm_up) +
      convertToInteger(formShift2.T2_NG_Warm_up) +
      convertToInteger(formShift3.T2_NG_Warm_up)
  ).format("0,0");
});

const T2_NG_Warm_up_Total = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_NG_Warm_up_Total) +
      convertToInteger(formShift2.T2_NG_Warm_up_Total) +
      convertToInteger(formShift3.T2_NG_Warm_up_Total)
  ).format("0,0");
});

const T2_NG_Preheat = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_NG_Preheat) +
      convertToInteger(formShift2.T2_NG_Preheat) +
      convertToInteger(formShift3.T2_NG_Preheat)
  ).format("0,0");
});

const T2_EBO_Preheat = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_EBO_Preheat) +
      convertToInteger(formShift2.T2_EBO_Preheat) +
      convertToInteger(formShift3.T2_EBO_Preheat)
  ).format("0,0");
});

const T2_CBO_Preheat = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_CBO_Preheat) +
      convertToInteger(formShift2.T2_CBO_Preheat) +
      convertToInteger(formShift3.T2_CBO_Preheat)
  ).format("0,0");
});

const T2_FCC_Preheat = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_FCC_Preheat) +
      convertToInteger(formShift2.T2_FCC_Preheat) +
      convertToInteger(formShift3.T2_FCC_Preheat)
  ).format("0,0");
});

const T2_Preheat_Total = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_Preheat_Total) +
      convertToInteger(formShift2.T2_Preheat_Total) +
      convertToInteger(formShift3.T2_Preheat_Total)
  ).format("0,0");
});

const T2_NG_Drying = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_NG_Drying) +
      convertToInteger(formShift2.T2_NG_Drying) +
      convertToInteger(formShift3.T2_NG_Drying)
  ).format("0,0");
});

const T2_NG_Drying_Total = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_NG_Drying_Total) +
      convertToInteger(formShift2.T2_NG_Drying_Total) +
      convertToInteger(formShift3.T2_NG_Drying_Total)
  ).format("0,0");
});

const T2_NG_Oil_Spray_checking = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_NG_Oil_Spray_checking) +
      convertToInteger(formShift2.T2_NG_Oil_Spray_checking) +
      convertToInteger(formShift3.T2_NG_Oil_Spray_checking)
  ).format("0,0");
});

const T2_NG_Oil_Spray_checking_Total = computed(() => {
  return numeral(
    convertToInteger(formShift1.T2_NG_Oil_Spray_checking_Total) +
      convertToInteger(formShift2.T2_NG_Oil_Spray_checking_Total) +
      convertToInteger(formShift3.T2_NG_Oil_Spray_checking_Total)
  ).format("0,0");
});

const T3_Mixing_Other = computed(() => {
  return numeral(
    convertToInteger(formShift1.T3_Mixing_Other) +
      convertToInteger(formShift2.T3_Mixing_Other) +
      convertToInteger(formShift3.T3_Mixing_Other)
  ).format("0,0");
});

const T3_Hoist_Other = computed(() => {
  return numeral(
    convertToInteger(formShift1.T3_Hoist_Other) +
      convertToInteger(formShift2.T3_Hoist_Other) +
      convertToInteger(formShift3.T3_Hoist_Other)
  ).format("0,0");
});

const T3_Kande_Other = computed(() => {
  return numeral(
    convertToInteger(formShift1.T3_Kande_Other) +
      convertToInteger(formShift2.T3_Kande_Other) +
      convertToInteger(formShift3.T3_Kande_Other)
  ).format("0,0");
});

const T3_Total_Mixing_Volume_Other = computed(() => {
  return numeral(
    convertToInteger(formShift1.T3_Total_Mixing_Volume_Other) +
      convertToInteger(formShift2.T3_Total_Mixing_Volume_Other) +
      convertToInteger(formShift3.T3_Total_Mixing_Volume_Other)
  ).format("0,0");
});

const T3_Discharged_Volume_Other = computed(() => {
  return numeral(
    convertToInteger(formShift1.T3_Discharged_Volume_Other) +
      convertToInteger(formShift2.T3_Discharged_Volume_Other) +
      convertToInteger(formShift3.T3_Discharged_Volume_Other)
  ).format("0,0");
});

const T3_KOH_Mixing_Other = computed(() => {
  return numeral(
    convertToInteger(formShift1.T3_KOH_Mixing_Other) +
      convertToInteger(formShift2.T3_KOH_Mixing_Other) +
      convertToInteger(formShift3.T3_KOH_Mixing_Other)
  ).format("0,0");
});

const T3_NaOH_Consumption_Other = computed(() => {
  return numeral(
    convertToInteger(formShift1.T3_NaOH_Consumption_Other) +
      convertToInteger(formShift2.T3_NaOH_Consumption_Other) +
      convertToInteger(formShift3.T3_NaOH_Consumption_Other)
  ).format("0,0");
});

const T3_Recycle_Hopper_Level_Other = computed(() => {
  return numeral(
    convertToInteger(formShift1.T3_Recycle_Hopper_Level_Other) +
      convertToInteger(formShift2.T3_Recycle_Hopper_Level_Other) +
      convertToInteger(formShift3.T3_Recycle_Hopper_Level_Other)
  ).format("0,0");
});

const storageTanks = computed(() => {
  return formShift1.storageTanks.concat(
    formShift2.storageTanks,
    formShift3.storageTanks
  );
});
</script>
