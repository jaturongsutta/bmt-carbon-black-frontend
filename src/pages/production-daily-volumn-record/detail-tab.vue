<template>
  <div>
    <v-row>
      <v-col md="3">
        <label>Operating Time(h)</label>
        <v-text-field v-model="form.Shift_Oper_Time" readonly></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Shift Start</label>
        <n-time v-model="form.Shift_Start"></n-time>
      </v-col>
      <v-col md="3">
        <label>Shift End</label>
        <n-time v-model="form.Shift_End"></n-time>
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
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T1_Production_EBO"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T1_Production_CBO"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T1_Production_FCC"
                ></v-text-field>
              </td>
              <td>{{ form.T1_Production_Prod_Total }}</td>
            </tr>
            <tr>
              <td>EKINEN</td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T1_EKINEN_EBO"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T1_EKINEN_CBO"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T1_EKINEN_FCC"
                ></v-text-field>
              </td>
              <td>{{ form.T1_EKINEN_EKN_Total }}</td>
            </tr>
            <tr>
              <td>Production + EKINEN</td>
              <td>{{ form.T1_PRODUCTION_EKINEN_EBO }}</td>
              <td>{{ form.T1_PRODUCTION_EKINEN_CBO }}</td>
              <td>{{ form.T1_PRODUCTION_EKINEN_FCC }}</td>
              <td>{{ form.T1_PRODUCTION_EKINEN_Total }}</td>
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
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T2_NG_Production"
                ></v-text-field>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ form.T2_NG_Production_Total }}</td>
            </tr>
            <tr>
              <td>Warm up</td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T2_NG_Warm_up"
                ></v-text-field>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ form.T2_NG_Warm_up_Total }}</td>
            </tr>
            <tr>
              <td>Preheat</td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T2_NG_Preheat"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T2_EBO_Preheat"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T2_CBO_Preheat"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T2_FCC_Preheat"
                ></v-text-field>
              </td>
              <td>{{ form.T2_Preheat_Total }}</td>
            </tr>
            <tr>
              <td>Drying</td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T2_NG_Drying"
                ></v-text-field>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ form.T2_NG_Drying_Total }}</td>
            </tr>
            <tr>
              <td>Oil Spray checking</td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T2_NG_Oil_Spray_checking"
                ></v-text-field>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ form.T2_NG_Oil_Spray_checking_Total }}</td>
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
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T3_Mixing_Other"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T3_Hoist_Other"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T3_Kande_Other"
                ></v-text-field>
              </td>
              <td>{{ form.T3_Total_Mixing_Volume_Other }}</td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  v-model="form.T3_Discharged_Volume_Other"
                ></v-text-field>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="3">
        <label>KOH Mixing(Litres)</label>
        <v-text-field
          v-model="form.T3_KOH_Mixing_Other"
          type="number"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col md="3">
        <label>NaOH Consumption(Litres)</label>
        <v-text-field
          v-model="form.T3_NaOH_Consumption_Other"
          type="number"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Recycle Hopper Level(%)</label>
        <v-text-field
          v-model="form.T3_Recycle_Hopper_Level_Other"
          type="number"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex align-end">
        <h5 class="float-start">Storage Tank</h5>
      </v-col>
      <v-col class="d-flex justify-end">
        <n-btn-add no-permission label="Add Tank" @click="addPopupTank">
        </n-btn-add>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table class="n-table mt-2 mb-3">
          <thead>
            <tr>
              <th>Tank</th>
              <th>Start Time</th>
              <th>Stop Time</th>
              <th>Reason</th>
              <th>Full Tank</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in form.storageTanks">
              <td>
                <v-select
                  hide-details
                  v-model="item.Tank"
                  :items="lineTankList"
                ></v-select>
              </td>
              <td>
                <n-time hide-details v-model="item.Tank_Start_Time"></n-time>
              </td>
              <td>
                <n-time hide-details v-model="item.Tank_Stop_Time"></n-time>
              </td>
              <td>
                <v-text-field hide-details v-model="item.Reason"></v-text-field>
              </td>
              <td>
                <v-checkbox
                  hide-details
                  value="Y"
                  v-model="item.Full_Tank"
                  checked
                ></v-checkbox>
              </td>
            </tr>
          </tbody> </v-table
      ></v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title> Add Tank </v-card-title>
        <v-card-text>
          <v-form ref="frmPopup">
            <v-row>
              <v-col md="3">
                <label class="require-field"> Tank</label>
                <v-select
                  :items="lineTankList"
                  v-model="popupTank"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>

              <v-col md="3">
                <label class="require-field">Start Time</label>
                <n-time
                  v-model="popupStartTime"
                  :rules="[rules.required]"
                ></n-time>
              </v-col>

              <v-col md="3">
                <label class="require-field">Stop Time</label>
                <n-time
                  v-model="popupStopTime"
                  :rules="[rules.required]"
                ></n-time>
              </v-col>

              <v-col md="3">
                <label>Reason</label>
                <v-text-field v-model="popupReason"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-checkbox
                  label="Full Tank"
                  value="Y"
                  v-model="popupFullTank"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <div class="d-flex justify-center py-3">
          <n-btn-save
            @click="savePopupTank"
            class="me-3"
            no-permission
          ></n-btn-save>
          <n-btn-cancel text @click="dialog = false"></n-btn-cancel>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits, watch, onMounted } from "vue";
import moment from "moment";
import * as ddlApi from "@/api/dropdown-list.js";
import rules from "@/utils/rules";
// Define emits
const emit = defineEmits(["update:modelValue"]);

const form = reactive({});

const frmPopup = ref(null);

const dialog = ref(false);

const lineTankList = ref([]);

const popupTank = ref(null);
const popupStartTime = ref(null);
const popupStopTime = ref(null);
const popupReason = ref(null);
const popupFullTank = ref(null);

// Define props
const props = defineProps({
  modelValue: {
    type: Object,
  },
  shiftName: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  ddlApi.lineTank().then((res) => {
    lineTankList.value = res;
  });
});

const addPopupTank = () => {
  dialog.value = true;
  popupTank.value = null;
  popupStartTime.value = null;
  popupStopTime.value = null;
  popupReason.value = null;
  popupFullTank.value = null;
};

const savePopupTank = async () => {
  const { valid } = await frmPopup.value.validate();
  if (valid) {
    if (form.storageTanks === undefined) {
      form.storageTanks = [];
    }
    form.storageTanks.push({
      Shift: props.shiftName,
      Tank: popupTank.value,
      Tank_Start_Time: popupStartTime.value,
      Tank_Stop_Time: popupStopTime.value,
      Reason: popupReason.value,
      Full_Tank: popupFullTank.value,
    });
    dialog.value = false;
  }
};

const conertToInt = (value) => {
  return value ? parseInt(value) : 0;
};

watch([() => form.Shift_Start, () => form.Shift_End], ([start, end]) => {
  // Calculate the difference between Shift_Start and Shift_End
  if (start && end) {
    let shiftStart = moment(start, "HH:mm");
    let shiftEnd = moment(end, "HH:mm");

    // If start time is greater than end time, add one day to end time
    if (shiftStart.isAfter(shiftEnd)) {
      shiftEnd.add(1, "day");
    }

    const duration = moment.duration(shiftEnd.diff(shiftStart));
    const hours = duration.asHours();
    form.Shift_Oper_Time = hours.toFixed(2);
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(form, newValue);
  },
  { immediate: true }
);
watch(
  form,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);

// Calculate total
watch(
  [
    () => form.T1_Production_EBO,
    () => form.T1_Production_CBO,
    () => form.T1_Production_FCC,
  ],
  ([n1, n2, n3]) => {
    form.T1_Production_Prod_Total =
      conertToInt(n1) + conertToInt(n2) + conertToInt(n3);

    form.T1_PRODUCTION_EKINEN_EBO =
      conertToInt(form.T1_Production_EBO) + conertToInt(form.T1_EKINEN_EBO);
    form.T1_PRODUCTION_EKINEN_CBO =
      conertToInt(form.T1_Production_CBO) + conertToInt(form.T1_EKINEN_CBO);
    form.T1_PRODUCTION_EKINEN_FCC =
      conertToInt(form.T1_Production_FCC) + conertToInt(form.T1_EKINEN_FCC);
    form.T1_PRODUCTION_EKINEN_Total =
      conertToInt(form.T1_Production_Prod_Total) +
      conertToInt(form.T1_EKINEN_EKN_Total);
  }
);

watch(
  [
    () => form.T1_EKINEN_EBO,
    () => form.T1_EKINEN_CBO,
    () => form.T1_EKINEN_FCC,
  ],
  ([n1, n2, n3]) => {
    form.T1_EKINEN_EKN_Total =
      conertToInt(n1) + conertToInt(n2) + conertToInt(n3);

    form.T1_PRODUCTION_EKINEN_EBO =
      conertToInt(form.T1_Production_EBO) + conertToInt(form.T1_EKINEN_EBO);
    form.T1_PRODUCTION_EKINEN_CBO =
      conertToInt(form.T1_Production_CBO) + conertToInt(form.T1_EKINEN_CBO);
    form.T1_PRODUCTION_EKINEN_FCC =
      conertToInt(form.T1_Production_FCC) + conertToInt(form.T1_EKINEN_FCC);
    form.T1_PRODUCTION_EKINEN_Total =
      conertToInt(form.T1_Production_Prod_Total) +
      conertToInt(form.T1_EKINEN_EKN_Total);
  }
);

watch(
  () => form.T2_NG_Production,
  (newValue) => {
    form.T2_NG_Production_Total = newValue;
  }
);
watch(
  () => form.T2_NG_Warm_up,
  (newValue) => {
    form.T2_NG_Warm_up_Total = newValue;
  }
);

watch(
  [
    () => form.T2_NG_Preheat,
    () => form.T2_EBO_Preheat,
    () => form.T2_CBO_Preheat,
    () => form.T2_FCC_Preheat,
  ],
  ([n1, n2, n3, n4]) => {
    form.T2_Preheat_Total =
      conertToInt(n1) + conertToInt(n2) + conertToInt(n3) + conertToInt(n4);
  }
);

watch(
  () => form.T2_NG_Drying,
  (newValue) => {
    form.T2_NG_Drying_Total = newValue;
  }
);
watch(
  () => form.T2_NG_Oil_Spray_checking,
  (newValue) => {
    form.T2_NG_Oil_Spray_checking_Total = newValue;
  }
);
</script>
