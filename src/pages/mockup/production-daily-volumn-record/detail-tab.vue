<template>
  <div>
    <v-row>
      <v-col md="3">
        <label>Operating Time(h)</label>
        <v-text-field value="8" readonly></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Shift Start</label>
        <v-text-field v-model="form.shippingType"></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Shift End</label>
        <v-text-field v-model="form.shippingType"></v-text-field>
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
                <v-text-field hide-details value="7,347"></v-text-field>
              </td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td>
                <v-text-field hide-details value="17,143"></v-text-field>
              </td>
              <td>24,249</td>
            </tr>
            <tr>
              <td>EKINEN</td>
              <td>
                <v-text-field hide-details value="5,760"></v-text-field>
              </td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td>24,249</td>
            </tr>
            <tr>
              <td>Production + EKINEN</td>
              <td>13,107</td>
              <td>0</td>
              <td>17,143</td>
              <td>30,250</td>
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
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>0</td>
            </tr>
            <tr>
              <td>Warm up</td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>0</td>
            </tr>
            <tr>
              <td>Preheat</td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td>Drying</td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>0</td>
            </tr>
            <tr>
              <td>Oil Spray checking</td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
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
              <td><v-text-field hide-details value="0"></v-text-field></td>
              <td>
                <v-text-field hide-details value="700"></v-text-field>
              </td>
              <td>
                <v-text-field hide-details value="0"></v-text-field>
              </td>
              <td>700</td>
              <td><v-text-field hide-details value="0"></v-text-field></td>
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
                <v-select hide-details value="1-1" :items="['1-1']"></v-select>
              </td>
              <td>
                <v-text-field hide-details value="00:00"></v-text-field>
              </td>
              <td>
                <v-text-field hide-details value="08:00"></v-text-field>
              </td>
              <td><v-text-field hide-details value=""></v-text-field></td>
              <td><v-checkbox hide-details value="Y" checked></v-checkbox></td>
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
import { reactive, ref, defineProps } from "vue";
// Define props
const props = defineProps({
  shiftName: {
    type: String,
    default: "",
  },
});

const form = reactive({
  shippingType: "",
});

const dialog = ref(false);
</script>
