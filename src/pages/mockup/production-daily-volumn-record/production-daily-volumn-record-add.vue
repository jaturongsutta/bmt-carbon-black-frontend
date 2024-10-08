<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Production Daily Volumn Record</h4>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="onSave" ref="frmInfo">
          <v-row>
            <v-col md="3">
              <label class="require-field">Date</label>
              <n-date v-model="form.date" :rules="[rules.required]"></n-date>
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

          <v-row>
            <v-col>
              <label>Upload</label>
              <!-- <v-file-input
                variant="outlined"
                density="compact"
                accept="image/*"
                prepend-icon
                append-icon="mdi mdi-paperclip"
              ></v-file-input> -->
              <v-text-field
                v-model="filenameTxt"
                placeholder="Please choose file to upload"
                readonly
                :rules="[validateUploadFile]"
                validate-on="submit"
              >
                <template v-slot:append>
                  <n-btn-upload @click="uplaodFileClick"></n-btn-upload>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-tabs v-model="tab" class="mb-3">
                <v-tab :value="1">Shift 1</v-tab>
                <v-tab :value="2">Shift 2</v-tab>
                <v-tab :value="3">Shift 3</v-tab>
                <v-tab :value="4">Summary</v-tab>
              </v-tabs>

              <v-tabs-window v-model="tab">
                <v-tabs-window-item :value="1">
                  <v-container fluid>
                    <detail-tab shift-name="Shift 1"> </detail-tab>
                  </v-container>
                </v-tabs-window-item>
                <v-tabs-window-item :value="2">
                  <v-container fluid>
                    <detail-tab shift-name="Shift 2"> </detail-tab>
                  </v-container>
                </v-tabs-window-item>
                <v-tabs-window-item :value="3">
                  <v-container fluid>
                    <detail-tab shift-name="Shift 3"> </detail-tab>
                  </v-container>
                </v-tabs-window-item>
                <v-tabs-window-item :value="4">
                  <v-container fluid>
                    <summary-tab> </summary-tab>
                  </v-container>
                </v-tabs-window-item>
              </v-tabs-window>
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
import detailTab from "./detail-tab.vue";
import summaryTab from "./summary-tab.vue";
const tab = ref(1);
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
