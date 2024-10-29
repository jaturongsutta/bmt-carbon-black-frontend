<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Production Daily Volumn Record</h4>
      </v-card-title>

      <v-card-text>
        <v-form ref="frmInfo">
          <v-form ref="frmMainInput">
            <v-row>
              <v-col md="3">
                <label class="require-field">Date</label>
                <n-date
                  v-model="form.date"
                  :rules="[rules.required]"
                  :readonly="mode === 'Edit' || validFileSuccess"
                ></n-date>
              </v-col>
              <v-col md="3">
                <label class="require-field">Line</label>
                <v-select
                  v-model="form.line"
                  :items="lineList"
                  :rules="[rules.required]"
                  :readonly="mode === 'Edit' || validFileSuccess"
                ></v-select>
              </v-col>
              <v-col md="3">
                <label class="require-field">Grade</label>
                <v-select
                  v-model="form.grade"
                  :items="gradeList"
                  :rules="[rules.required]"
                  :readonly="mode === 'Edit' || validFileSuccess"
                ></v-select>
              </v-col>
              <v-col md="3">
                <label class="require-field">Product Name</label>
                <v-select
                  v-model="form.productName"
                  :items="productList"
                  :rules="[rules.required]"
                  :readonly="mode === 'Edit' || validFileSuccess"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
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
                ref="fileInputTxt"
                v-model="filenameTxt"
                placeholder="Please choose file to upload"
                readonly
                :rules="[validateFileUpload]"
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
                    <detail-tab shift-name="1" v-model="shiftData1">
                    </detail-tab>
                  </v-container>
                </v-tabs-window-item>
                <v-tabs-window-item :value="2">
                  <v-container fluid>
                    <detail-tab shift-name="2" v-model="shiftData2">
                    </detail-tab>
                  </v-container>
                </v-tabs-window-item>
                <v-tabs-window-item :value="3">
                  <v-container fluid>
                    <detail-tab shift-name="3" v-model="shiftData3">
                    </detail-tab>
                  </v-container>
                </v-tabs-window-item>
                <v-tabs-window-item :value="4">
                  <v-container fluid>
                    <summary-tab
                      v-bind:model-value-shift1="shiftData1"
                      v-bind:model-value-shift2="shiftData2"
                      v-bind:model-value-shift3="shiftData3"
                    >
                    </summary-tab>
                  </v-container>
                </v-tabs-window-item>
              </v-tabs-window>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <div class="d-flex justify-center mb-3">
                <n-btn-save @click="onSave"> </n-btn-save>
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
const frmMainInput = ref(null);

const fileInput = ref(null);
const fileInputTxt = ref(null);
const Alert = inject("Alert");
const route = useRoute();

const router = useRouter();
const form = ref({});
const shiftData1 = ref({});
const shiftData2 = ref({});
const shiftData3 = ref({});

let filedata = null;
let filenameTxt = ref(null);

const mode = ref("Add");

const gradeList = ref([]);
const lineList = ref([]);
const productList = ref([]);

const isLoading = ref(false);

let dateExcel = null;
let lineExcel = null;
let gradeExcel = null;
let productExcel = null;
const validFileSuccess = ref(false);

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
    mode.value = "Edit";
    loadData(route.params.id);
  } else {
    form.value.date = dateUtils.getToday();
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
        console.log(res);
        form.value = res;
        shiftData1.value = res.shifts[0];
        shiftData2.value = res.shifts[1];
        shiftData3.value = res.shifts[2];
      }
    })
    .catch((error) => {
      isLoading.value = false;
      console.error("Error fetching API:", error);
      Alert.error(error.message);
    });
};

const onSave = async () => {
  const { valid: validMain } = await frmMainInput.value.validate();
  const validFile = await fileInputTxt.value.validate();

  if (validMain && validFile.length === 0) {
    try {
      isLoading.value = true;
      let res = null;

      const data = {
        date: form.value.date,
        line: form.value.line,
        grade: form.value.grade,
        productName: form.value.productName,
        filename: filenameTxt.value,
        filedata: filedata,
        shifts: [shiftData1.value, shiftData2.value, shiftData3.value],
      };
      if (mode.value === "Add") {
        res = await api.add(data);
      } else {
        res = await api.update(route.params.id, data);
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

const uplaodFileClick = async () => {
  const { valid } = await frmMainInput.value.validate();

  if (valid) {
    fileInput.value.value = "";
    fileInput.value.click();
  }
};

const handleFileChange = (event) => {
  console.log("handleFileChange", event);
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    const filename = file.name;

    filenameTxt.value = filename;

    const formData = new FormData();
    formData.append("file", file);
    isLoading.value = true;
    form.value.filename = null;
    dateExcel = null;
    lineExcel = null;
    gradeExcel = null;
    productExcel = null;
    api
      .uploadFile(formData)
      .then((res) => {
        isLoading.value = false;
        if (res.result.status === 0) {
          dateExcel = res.date;
          lineExcel = res.line;
          gradeExcel = res.grade;
          productExcel = res.productName;

          shiftData1.value = res.shifts[0];
          shiftData2.value = res.shifts[1];
          shiftData3.value = res.shifts[2];
          validFileSuccess.value = true;
          fileInputTxt.value.validate().then((frm) => {
            // if (frm.valid) {
            //   validFileSuccess.value = true;
            // } else {
            //   validFileSuccess.value = false;
            // }
          });
        } else {
          dataSave = [];
          items.value = [];
          totalItems.value = 0;
          Alert.warning(res.result.message);
          validFileSuccess.value = false;
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

// validate
const validateFileUpload = (value) => {
  if (mode.value === "Add") {
    if (!value) {
      return "Please choose file to upload";
    }
  }

  if (value) {
    if (form.value.date != dateExcel) {
      return "Date not match in file";
    }

    if (form.value.line != lineExcel) {
      return "Line not match in file";
    }

    const grade = gradeList.value.find((x) => x.title === gradeExcel);

    if (!grade) {
      return "Grade not match in file";
    }

    if (form.value.productName != productExcel) {
      return "Product Name not match in file";
    }
  }
  return true;
};
</script>
