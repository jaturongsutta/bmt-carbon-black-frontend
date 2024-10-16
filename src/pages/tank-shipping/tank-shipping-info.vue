<template>
  <div>
    <v-card>
      <v-card-title class="pl-2 mb-2">
        <h4>Add Tank Shipping</h4>
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
                    :items="['1-1', '1-2', '1-3', '2-1', '2-2']"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Grade</label>
                  <v-select
                    v-model="form.grade"
                    :items="['SAF']"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Product Name</label>
                  <v-select
                    v-model="form.productName"
                    :items="['B120', 'B72J', 'B97', 'N550', 'N550G']"
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
                    :items="[
                      'FC (Cleaning)',
                      'FC (Outspec)',
                      'PL (Pallet less)',
                    ]"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>

                <v-col md="4">
                  <label class="require-field">Class</label>
                  <v-select
                    v-model="form.class"
                    :items="['C', 'F', 'X']"
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
                  <v-select
                    v-model="form.packingWeight"
                    :items="['500', '750', '1000']"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Total Q'ty (Kg.)</label>
                  <v-text-field
                    v-model="form.totalQty"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Working Time Start</label>
                  <v-text-field
                    v-model="form.workingTimeStart"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col md="3">
                  <label class="require-field">Working Time Stop</label>
                  <v-text-field
                    v-model="form.workingTimeStop"
                    :rules="[rules.required]"
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
                  <v-text-field v-model="form.emptyTime"></v-text-field>
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

const frmInfo = ref(null);

const Alert = inject("Alert");
const route = useRoute();

const router = useRouter();
const form = ref({
  date: "2024-09-09",
  linkTank: "1-1",
  grade: "SAF",
  productName: "B120",
  shippingType: "FC (Cleaning)",
  class: "C",
  lotNo: "412CD8",
  packingWeight: "500",
  totalQty: "1000",
  workingTimeStart: "08:00",
  workingTimeStop: "16:00",
  adjestValue: "40",
  additionnalAdjestmant: "",
  empty: false,
  emptyTime: "08:12",
});

const isLoading = ref(false);

onMounted(() => {
  if (route.query.date) {
    form.value.date = route.query.date;
  }
  if (route.params.id) {
    const id = route.params.id;
  }
});

const onSave = async () => {
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
