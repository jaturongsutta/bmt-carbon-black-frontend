<template>
  <div>
    <v-card>
      <v-card-title class="pl-2 mb-2">
        <h4>{{ mode }} Failed Management</h4>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="onSave" ref="frmInfo">
          <v-container class="px-0">
            <v-row>
              <v-col md="3">
                <label class="require-field">Month</label>
                <v-select
                  v-model="form.month"
                  :items="monthList"
                  :rules="[rules.required]"
                  :readonly="mode === 'Edit'"
                ></v-select>
              </v-col>
              <v-col md="3">
                <label class="require-field">Year</label>
                <v-select
                  v-model="form.year"
                  :items="yearList"
                  :rules="[rules.required]"
                  :readonly="mode === 'Edit'"
                ></v-select>
              </v-col>

              <v-col md="3">
                <label class="require-field">Line</label>
                <v-select
                  v-model="form.line"
                  :items="lineList"
                  :rules="[rules.required]"
                  @update:model-value="getProductWeight"
                  :readonly="mode === 'Edit'"
                ></v-select>
              </v-col>
              <v-col md="3">
                <label class="require-field">Product Name</label>
                <v-select
                  v-model="form.productName"
                  :items="productList"
                  :rules="[rules.required]"
                  @update:model-value="getProductWeight"
                  :readonly="mode === 'Edit'"
                ></v-select>
              </v-col>
              <v-col md="3">
                <label class="require-field">Production Weigth # 2</label>
                <v-text-field
                  v-model="form.prodWeight2"
                  readonly
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col md="3">
                <label class="require-field">Failed Value</label>
                <v-text-field
                  v-model="form.failedValue"
                  :rules="[rules.required, rules.integer, rules.nonNegative]"
                  type="number"
                  @update:model-value="calculateFinalProd2"
                ></v-text-field>
              </v-col>

              <v-col md="3">
                <label class="require-field">Final Production # 2</label>
                <v-text-field
                  v-model="form.finalProd2"
                  readonly
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="d-flex justify-center ma-3">
                  <n-btn-save type="submit"> </n-btn-save>
                  <n-btn-cancel @click="router.go(-1)" class="ml-3" />
                </div>
              </v-col>
            </v-row>
          </v-container>

          <n-loading :loading="isLoading" />
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, readonly } from "vue";
import { useRoute, useRouter } from "vue-router";
import rules from "@/utils/rules";
import moment from "moment";
import * as api from "@/api/failed-management.js";
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
  adjValue: null,
  additionalAdj: null,
  empty: "N",
  emptyTime: null,
});

const lineList = ref([]);
const productList = ref([]);

const monthList = ref([]);
const yearList = ref([]);

const isLoading = ref(false);

onMounted(() => {
  ddlApi.line().then((res) => {
    lineList.value = res;
  });

  ddlApi.product().then((res) => {
    productList.value = res;
  });

  ddlApi.getMonth().then((res) => {
    monthList.value = res;
  });

  ddlApi.getYear().then((res) => {
    yearList.value = res;
  });

  if (route.params.id) {
    mode.value = "Edit";
    loadData(route.params.id);
  } else {
    // Add Mode
    if (route.query.month) {
      form.value.month = route.query.month;
    }
    if (route.query.year) {
      form.value.year = route.query.year;
    }
  }
});

const loadData = (id) => {
  isLoading.value = true;
  api
    .getById(id)
    .then((res) => {
      isLoading.value = false;
      if (res.status === 2) {
        Alert.error(res.message);
      } else {
        form.value = res;

        form.value.month = res.month.toString();
        form.value.year = res.year.toString();

        form.value.shippingType = res.shippingType
          ? res.shippingType.toString()
          : null;
      }
      form.value = res;
    })
    .catch((error) => {
      isLoading.value = false;
      console.error("Error fetching API:", error);
      Alert.error(error.message);
    });
};

const onSave = async () => {
  const { valid } = await frmInfo.value.validate();

  if (valid) {
    try {
      isLoading.value = true;
      let res = null;
      if (mode.value === "Add") {
        res = await api.add(form.value);
      } else {
        res = await api.update(route.params.id, form.value);
      }

      isLoading.value = false;

      if (res.status === 0) {
        Alert.success(res.message);
        router.go(-1);
      } else if (res.status === 1) {
        Alert.warning(res.message);
      } else {
        Alert.error(res.message);
      }
    } catch (error) {
      console.error("Error fetching API:", error);
      isLoading.value = false;
      Alert.error(error.message);
    }
  }
};

const getProductWeight = async () => {
  isLoading.value = true;
  if (
    form.value.month &&
    form.value.year &&
    form.value.line &&
    form.value.productName
  ) {
    const res = await api.getProductWeight(
      form.value.month,
      form.value.year,
      form.value.line,
      form.value.productName
    );

    if (res.status === 0) {
      form.value.prodWeight2 = res.data;
    } else {
      form.value.prodWeight2 = null;
      Alert.warning(res.message);
    }
  } else {
    form.value.prodWeight2 = null;
  }

  isLoading.value = false;

  calculateFinalProd2();
};

const calculateFinalProd2 = () => {
  if (form.value.prodWeight2 && form.value.failedValue) {
    form.value.finalProd2 =
      parseInt(form.value.prodWeight2) + parseInt(form.value.failedValue);
  } else {
    form.value.finalProd2 = null;
  }
};
</script>
