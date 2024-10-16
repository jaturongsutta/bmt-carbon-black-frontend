<template>
  <div>
    <v-card>
      <v-card-title class="pl-2 mb-2">
        <h4>{{ mode }} Tank Shipping</h4>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="onSave" ref="frmInfo">
          <v-row>
            <v-col md="6">
              <v-row no-gutters>
                <v-col md="3">
                  <label class="require-field">Date</label>
                  <n-date
                    v-model="form.date"
                    :rules="[rules.required]"
                  ></n-date>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Link-Tank</label>
                  <v-select
                    v-model="form.linkTank"
                    :items="lineTankList"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Grade</label>
                  <v-select
                    v-model="form.grade"
                    :items="gradeList"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Product Name</label>
                  <v-select
                    v-model="form.productName"
                    :items="productList"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="6" class="pa-0">
              <v-row no-gutters>
                <v-col md="4">
                  <label class="require-field">Shipping Type</label>
                  <v-select
                    v-model="form.shippingType"
                    :items="shippingTypeList"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>

                <v-col md="4">
                  <label class="require-field">Class</label>
                  <v-select
                    v-model="form.class"
                    :items="classList"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <v-col md="4">
                  <label class="require-field">Lot No.</label>
                  <v-text-field
                    v-model="form.lotNo"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col md="6"
              ><v-row no-gutters>
                <v-col md="3">
                  <label class="require-field">Packing Weight (Kg.)</label>
                  <v-text-field
                    v-model="form.packingWeight"
                    :rules="[rules.required, rules.integer]"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Total Q'ty (Kg.)</label>
                  <v-text-field
                    v-model="form.totalQty"
                    :rules="[rules.required, , rules.integer]"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Working Time Start</label>
                  <v-text-field
                    v-model="form.workingTimeStart"
                    :rules="[rules.required]"
                    type="time"
                  ></v-text-field>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Working Time Stop</label>
                  <v-text-field
                    v-model="form.workingTimeStop"
                    :rules="[rules.required]"
                    type="time"
                  ></v-text-field>
                </v-col> </v-row
            ></v-col>
            <v-col md="6"
              ><v-row no-gutters>
                <v-col md="4">
                  <label>Adjust Value</label>
                  <v-text-field
                    v-model="form.adjestValue"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col md="4">
                  <label>Additional Adjustment</label>
                  <v-text-field
                    v-model="form.additionnalAdjestmant"
                  ></v-text-field>
                </v-col> </v-row
            ></v-col>
            <v-col md="6">
              <v-row no-gutters>
                <v-col md="3">
                  <label>Empty</label>
                  <v-checkbox v-model="form.empty" label="Yes"></v-checkbox>
                </v-col>
                <v-col md="3">
                  <label>Empty Time</label>
                  <v-text-field
                    v-model="form.emptyTime"
                    type="time"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <div class="d-flex justify-center mb-3">
                <v-btn
                  prepend-icon="mdi mdi-content-save "
                  color="primary"
                  type="submit"
                >
                  <template v-slot:prepend>
                    <v-icon color="white" size="large"></v-icon>
                  </template>
                  Save
                </v-btn>
                <n-btn-cancel @click="router.go(-1)" class="ml-3" />
              </div>
            </v-col>
          </v-row>
          <n-loading :loading="isLoading" />
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import rules from "@/utils/rules";
import * as api from "@/api/tank-shipping.js";
import * as ddlApi from "@/api/dropdown-list.js";
const frmInfo = ref(null);
const Alert = inject("Alert");
const route = useRoute();
const router = useRouter();

const mode = ref("Add");

const form = ref({
  date: null,
  linkTank: null,
  grade: null,
  productName: null,
  shippingType: null,
  class: null,
  lotNo: null,
  packingWeight: null,
  totalQty: null,
  workingTimeStart: null,
  workingTimeStop: null,
  adjestValue: null,
  additionnalAdjestmant: null,
  empty: false,
  emptyTime: null,
});

const lineTankList = ref([]);
const gradeList = ref([]);
const productList = ref([]);

const classList = ref([]);
const shippingTypeList = ref([]);

const isLoading = ref(false);

onMounted(() => {
  ddlApi.lineTank().then((res) => {
    lineTankList.value = res;
  });

  ddlApi.getPredefine("Grade").then((res) => {
    gradeList.value = res;
  });

  ddlApi.product().then((res) => {
    productList.value = res;
  });

  ddlApi.getPredefine("Class").then((res) => {
    classList.value = res;
  });

  ddlApi.getPredefine("Shipping_Type").then((res) => {
    shippingTypeList.value = res;
  });

  if (route.query.date) {
    form.value.date = route.query.date;
  }
  if (route.params.id) {
    mode.value = "Edit";
    loadData(route.params.id);
  }
});

const loadData = async (id) => {};

const onSave = async () => {
  console.log("onSave  form", form.value);
  const { valid } = await frmInfo.value.validate();

  console.log("valid", valid);
  if (valid) {
    isLoading.value = true;

    setTimeout(() => {
      isLoading.value = false;
      Alert.success();
    }, 1000);
  }
};
</script>
