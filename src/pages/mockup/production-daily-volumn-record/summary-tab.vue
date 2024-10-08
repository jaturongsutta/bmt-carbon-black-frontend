<template>
  <div>
    <v-row>
      <v-col md="3" class="d-flex align-center">
        <label>Shift 1, Shift 2, Shift 3</label>
      </v-col>
      <v-col md="3">
        <label>Total Operating Time(h)</label>
        <v-text-field value="24" readonly></v-text-field>
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
              <td>22,008</td>
              <td>0</td>
              <td>51,352</td>
              <td>24,249</td>
            </tr>
            <tr>
              <td>EKINEN</td>
              <td>17,289</td>
              <td>0</td>
              <td>0</td>
              <td></td>
            </tr>
            <tr>
              <td>Production + EKINEN</td>
              <td>30,250</td>
              <td>30,160</td>
              <td>30,230</td>
              <td>90,640</td>
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
              <td>0</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Warm up</td>
              <td>0</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Preheat</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Drying</td>
              <td>0</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Oil Spray checking</td>
              <td>0</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td>700</td>
              <td>2,200</td>
              <td>0</td>
              <td>2,900</td>
              <td>0</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="3">
        <label>KOH Mixing(Litres)</label>
        <v-text-field readonly value="0"></v-text-field>
      </v-col>
      <v-col md="3">
        <label>NaOH Consumption(Litres)</label>
        <v-text-field readonly value="0"></v-text-field>
      </v-col>
      <v-col md="3">
        <label>Recycle Hopper Level(%)</label>
        <v-text-field readonly value="3"></v-text-field>
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
            <tr>
              <td>1</td>
              <td>1-2</td>
              <td>00:00</td>
              <td>08:00</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>1-2</td>
              <td>08:00</td>
              <td>16:00</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>3</td>
              <td>1-2</td>
              <td>16:00</td>
              <td>17:55</td>
              <td>Tank changing order</td>
              <td>
                <v-checkbox readonly v-model="checked" value="Y"></v-checkbox>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>1-3</td>
              <td>18:00</td>
              <td>24:00</td>
              <td></td>
              <td></td>
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

const checked = ref("Y");

const form = reactive({
  shippingType: "",
});

const dialog = ref(false);
</script>
