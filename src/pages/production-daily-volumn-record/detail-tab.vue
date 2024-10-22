<template>
  <div>
    <v-row>
      <v-col md="3">
        <label>Operating Time(h)</label>
        <v-text-field v-model="form.Shift_Oper_Time" readonly></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Shift Start</label>
        <v-text-field v-model="form.Shift_Start" type="time"></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Shift End</label>
        <v-text-field v-model="form.Shift_End" type="time"></v-text-field>
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
              <td>{{ form.T1_EKINEN_FS_Oil_All_EBO }}</td>
              <td>{{ form.T1_EKINEN_FS_Oil_All_CBO }}</td>
              <td>{{ form.T1_EKINEN_FS_Oil_All_FCC }}</td>
              <td>{{ form.T1_EKINEN_FS_Oil_All_Total }}</td>
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
        <h5 class="float-start">Storange Tank</h5>
      </v-col>
      <v-col class="d-flex justify-end">
        <n-btn-add no-permission label="Add Tank" @click="dialog = true">
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
            <tr>
              <td>
                <v-select
                  hide-details
                  type="number"
                  value="1-1"
                  :items="['1-1']"
                ></v-select>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  value="00:00"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  value="08:00"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  value=""
                ></v-text-field>
              </td>
              <td>
                <v-checkbox
                  hide-details
                  type="number"
                  value="Y"
                  checked
                ></v-checkbox>
              </td>
            </tr>
          </tbody> </v-table
      ></v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title> Add Tank </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <label class="require-field"> Tank</label>
              <v-select :items="['1-1']"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label class="require-field">Start Time</label>
              <v-text-field></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label class="require-field">Stop Time</label>
              <v-text-field></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label>Reason</label>
              <v-text-field></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-checkbox label="Full Tank"></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <div class="d-flex justify-center py-3">
          <n-btn-save
            @click="dialog = false"
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
import { reactive, ref, defineProps, defineEmits, watch } from "vue";
import moment from "moment";
// Define emits
const emit = defineEmits(["update:modelValue"]);

const form = reactive({});

const dialog = ref(false);

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

const conertToInt = (value) => {
  return value ? parseInt(value) : 0;
};

watch([() => form.Shift_Start, () => form.Shift_End], ([start, end]) => {
  // Calculate the difference between Shift_Start and Shift_End
  if (start && end) {
    const shiftStart = moment(start, "HH:mm");
    const shiftEnd = moment(end, "HH:mm");
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

    form.T1_EKINEN_FS_Oil_All_EBO =
      conertToInt(form.T1_Production_EBO) + conertToInt(form.T1_EKINEN_EBO);
    form.T1_EKINEN_FS_Oil_All_CBO =
      conertToInt(form.T1_Production_CBO) + conertToInt(form.T1_EKINEN_CBO);
    form.T1_EKINEN_FS_Oil_All_FCC =
      conertToInt(form.T1_Production_FCC) + conertToInt(form.T1_EKINEN_FCC);
    form.T1_EKINEN_FS_Oil_All_Total =
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

    form.T1_EKINEN_FS_Oil_All_EBO =
      conertToInt(form.T1_Production_EBO) + conertToInt(form.T1_EKINEN_EBO);
    form.T1_EKINEN_FS_Oil_All_CBO =
      conertToInt(form.T1_Production_CBO) + conertToInt(form.T1_EKINEN_CBO);
    form.T1_EKINEN_FS_Oil_All_FCC =
      conertToInt(form.T1_Production_FCC) + conertToInt(form.T1_EKINEN_FCC);
    form.T1_EKINEN_FS_Oil_All_Total =
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
