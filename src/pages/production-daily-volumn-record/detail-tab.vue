<template>
  <div>
    <v-row>
      <v-col md="3">
        <label>Operating Time(h)</label>
        <v-text-field v-model="form.operatingTime" readonly></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Shift Start</label>
        <v-text-field v-model="form.Shift_Start"></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Shift End</label>
        <v-text-field v-model="form.Shift_End"></v-text-field>
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
              <th>FCO</th>
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
                  v-model="form.T1_Production_FCO"
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
              <td>{{ form.T1_EKINEN_FS_Oil_All_CBO }}</td>
              <td>{{ form.T1_EKINEN_FS_Oil_All_EBO }}</td>
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
              <td>0</td>
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
                  value="0"
                ></v-text-field>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>0</td>
            </tr>
            <tr>
              <td>Oil Spray checking</td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  value="0"
                ></v-text-field>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>0</td>
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
                  value="0"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  value="700"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  value="0"
                ></v-text-field>
              </td>
              <td>700</td>
              <td>
                <v-text-field
                  hide-details
                  type="number"
                  value="0"
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
        <v-text-field value="0"></v-text-field>
      </v-col>
      <v-col md="3">
        <label>NaOH Consumption(Litres)</label>
        <v-text-field value="0"></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Recycle Hopper Level(%)</label>
        <v-text-field value="3"></v-text-field>
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

// Define emits
const emit = defineEmits(["update:modelValue"]);

const form = reactive({
  operatingTime: "",
  shippingType: "",
});

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
      parseInt(n1) + parseInt(n2) + parseInt(n3) + parseInt(n4);
  }
);
</script>
