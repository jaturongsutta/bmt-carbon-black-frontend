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
              <label class="require-field">Link</label>
              <v-select
                v-model="form.line"
                :items="lineList"
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

          <v-row>
            <v-col>
              <label>Upload</label>
              <input
                ref="fileInput"
                type="file"
                accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style="display: none"
                @change="handleFileChange"
              />
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
                    <detail-tab shift-name="Shift 1" v-model="shiftData1">
                    </detail-tab>
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
                <n-btn-save type="submit"> </n-btn-save>
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

import * as ddlApi from "@/api/dropdown-list.js";
import * as api from "@/api/production-daily-volumn-record.js";
import * as dateUtils from "@/utils/date.js";
const tab = ref(1);
const frmInfo = ref(null);
const fileInput = ref(null);
const Alert = inject("Alert");
const route = useRoute();

const router = useRouter();
const form = ref({});
const shiftData1 = ref({});

let filedata = null;

const mode = ref("Add");

const gradeList = ref([]);
const lineList = ref([]);
const productList = ref([]);

const isLoading = ref(false);

onMounted(() => {
  ddlApi.getPredefine("Grade").then((res) => {
    gradeList.value = res;
  });
  ddlApi.line().then((res) => {
    lineList.value = res;
  });

  ddlApi.product().then((res) => {
    productList.value = res;
  });

  if (route.params.id) {
    const id = route.params.id;
  } else {
    form.value.date = dateUtils.getToday();
  }

  shiftData1.value.operatingTime = "00:00";
});

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

const uplaodFileClick = () => {
  console.log("upload file");
  fileInput.value.value = "";
  fileInput.value.click();
};

const handleFileChange = (event) => {
  console.log("handleFileChange");
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    const filename = file.name;

    const formData = new FormData();
    formData.append("file", file);
    isLoading.value = true;
    form.value.filename = null;
    api
      .uploadFile(formData)
      .then((res) => {
        isLoading.value = false;
        if (res.result.status === 0) {
          shiftData1.value = res.shifts[0];
        } else {
          dataSave = [];
          items.value = [];
          totalItems.value = 0;
          Alert.warning(res.result.message);
        }
      })
      .catch((err) => {
        isLoading.value = false;
        console.log(err);
        Alert.error("Upload file failed");
      });

    const reader = new FileReader();
    reader.onload = function (loadEvent) {
      const base64String = loadEvent.target.result;
      // base64String contains the file content in base64
      filedata = base64String;
    };

    reader.readAsDataURL(file);
  }
};
</script>
