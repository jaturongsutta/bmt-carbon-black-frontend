<template>
  <div>
    <v-card>
      <v-card-title class="pl-2 mb-2">
        <h4>{{ mode }} Tank Shipping</h4>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="onSave" ref="frmInfo">
          <v-container class="px-0">
            <v-row no-gutters>
              <v-col md="6">
                <v-row>
                  <v-col md="3">
                    <label class="require-field">Date</label>
                    <n-date
                      v-model="form.date"
                      :rules="[rules.required]"
                      :readonly="mode === 'Edit'"
                      @update:model-value="totalQtyChange"
                    ></n-date>
                  </v-col>
                  <v-col md="3">
                    <label class="require-field">Link-Tank</label>
                    <v-select
                      v-model="form.lineTank"
                      :items="lineTankList"
                      :rules="[rules.required]"
                      :readonly="mode === 'Edit'"
                      @update:model-value="totalQtyChange"
                    ></v-select>
                  </v-col>
                  <v-col md="3">
                    <label class="require-field">Grade</label>
                    <v-select
                      v-model="form.grade"
                      :items="gradeList"
                      :rules="[rules.required]"
                      :readonly="mode === 'Edit'"
                      @update:model-value="totalQtyChange"
                    ></v-select>
                  </v-col>
                  <v-col md="3">
                    <label class="require-field">Product Name</label>
                    <v-select
                      v-model="form.productName"
                      :items="productList"
                      :rules="[rules.required]"
                      :readonly="mode === 'Edit'"
                      @update:model-value="totalQtyChange"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="6">
                <v-row>
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
            </v-row>
          </v-container>
          <v-container class="px-0">
            <v-row no-gutters>
              <v-col md="6"
                ><v-row>
                  <v-col md="3">
                    <label class="require-field">Packing Weight (Kg.)</label>
                    <!-- <v-text-field
                      v-model="form.packingWeight"
                      :rules="[rules.required, rules.integer]"
                      type="number"
                    ></v-text-field> -->

                    <v-select
                      :items="packingWeightList"
                      v-model="form.packingWeight"
                      :rules="[rules.required]"
                    ></v-select>
                  </v-col>
                  <v-col md="3">
                    <label class="require-field">Total Q'ty (Kg.)</label>
                    <v-text-field
                      v-model="form.totalQty"
                      :rules="[
                        rules.required,
                        rules.integer,
                        rules.nonNegative,
                      ]"
                      type="number"
                      @input="totalQtyChange"
                    ></v-text-field>
                  </v-col>
                  <v-col md="3">
                    <label class="require-field">Working Time Start</label>
                    <n-time
                      v-model="form.workingTimeStart"
                      :rules="[rules.required]"
                      @input="totalQtyChange"
                    ></n-time>
                  </v-col>
                  <v-col md="3">
                    <label class="require-field">Working Time Stop</label>
                    <n-time
                      v-model="form.workingTimeStop"
                      :rules="[rules.required]"
                      @input="totalQtyChange"
                    ></n-time>
                  </v-col> </v-row
              ></v-col>

              <v-col md="6"
                ><v-row>
                  <v-col md="4">
                    <label>Adjust Value</label>
                    <v-text-field
                      v-model="form.adjValue"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col md="4">
                    <label>Additional Adjustment</label>
                    <v-text-field
                      v-model="form.additionalAdj"
                      :rules="[rules.integer, rules.nonNegative]"
                      type="number"
                    ></v-text-field>
                  </v-col> </v-row
              ></v-col>
            </v-row>
          </v-container>
          <v-container class="px-0">
            <v-row no-gutters>
              <v-col md="6">
                <v-row no-gutters>
                  <v-col md="3">
                    <label>Empty</label>
                    <v-checkbox
                      v-model="form.empty"
                      value="Y"
                      label="Yes"
                      @update:model-value="totalQtyChange"
                    ></v-checkbox>
                  </v-col>
                  <v-col md="3">
                    <label>Empty Time</label>
                    <n-time
                      ref="emptyTime"
                      v-model="form.emptyTime"
                      :rules="[validEmptyTime]"
                    ></n-time>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>

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
import { onMounted, ref, inject, readonly } from "vue";
import { useRoute, useRouter } from "vue-router";
import rules from "@/utils/rules";
import * as api from "@/api/tank-shipping.js";
import * as ddlApi from "@/api/dropdown-list.js";
const frmInfo = ref(null);
const Alert = inject("Alert");
const route = useRoute();
const router = useRouter();

const mode = ref("Add");

const emptyTime = ref(null);

const form = ref({
  date: null,
  lineTank: null,
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

const lineTankList = ref([]);
const gradeList = ref([]);
const productList = ref([]);

const packingWeightList = ref([]);

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

  ddlApi.getPredefine("Packing_Weight").then((res) => {
    packingWeightList.value = res;
  });

  if (route.params.id) {
    mode.value = "Edit";
    loadData(route.params.id);
  } else {
    // Add Mode
    if (route.query.date) {
      form.value.date = route.query.date;
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
        form.value.tankShippingId = id;
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

const totalQtyChange = (e) => {
  console.log("totalQtyChange", form.value);
  if (emptyTime.value.validate) {
    emptyTime.value.validate();
  }
  if (
    form.value.date !== null &&
    form.value.lineTank !== null &&
    form.value.grade !== null &&
    form.value.productName !== null &&
    form.value.totalQty !== null &&
    form.value.tankShippingId !== null &&
    form.value.workingTimeStart !== null &&
    form.value.workingTimeStop !== null
  )
    api.getAdjectValue(form.value).then((res) => {
      if (res.status === 0) {
        form.value.adjValue = res.data;
      } else {
        form.value.adjValue = null;
        Alert.error(res.message);
      }
    });
};

const validEmptyTime = (value) => {
  if (form.value.empty === "Y" && value === null) {
    return "This field is required";
  }
  return true;
};
</script>
