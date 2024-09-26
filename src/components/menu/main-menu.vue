<template>
  <v-container>
    <v-form ref="frmInfo" @submit.prevent="onSave">
      <v-row>
        <v-col md="3">
          <label>Menu No</label>
          <v-text-field
            v-model="form.menuNo"
            :readonly="pageMode === 'edit'"
            :rules="[rules.isRequire]"
          ></v-text-field>
        </v-col>
        <v-col md="3">
          <label>Group Menu No</label>
          <v-text-field v-model="form.menuGroup"></v-text-field>
        </v-col>
        <v-col md="3">
          <label>Seq</label>
          <v-text-field v-model="form.menuSeq"></v-text-field>
        </v-col>
        <v-col md="3">
          <label>Status</label>
          <n-select
            v-model="form.isActive"
            :items="statusList"
            :rules="[rules.isRequire]"
          ></n-select>
        </v-col>
        <v-col md="6">
          <label>Menu Name (EN)</label>

          <v-text-field
            v-model="form.menuNameEN"
            :rules="[rules.isRequire]"
          ></v-text-field>
        </v-col>
        <v-col md="6">
          <label>Menu Name (TH)</label>
          <v-text-field
            v-model="form.menuNameTH"
            :rules="[rules.isRequire]"
          ></v-text-field>
        </v-col>

        <v-col md="12">
          <label>Url</label>
          <v-text-field
            v-model="form.url"
            :rules="[rules.isRequire]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <div class="d-flex justify-center">
            <n-btn-save type="submit" />
            <n-btn-cancel @click="onCancel" class="ml-3" />
          </div>
        </v-col>
      </v-row>

      <n-loading :loading="isLoading" />
    </v-form>
  </v-container>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";

import ddlApi from "@/api/dropdown-list.js";
import { getMenuById, saveAdd, saveEdit } from "@/api/common-master/menu.js";

import rules from "@/utils/rules.js";
const router = useRouter();
const route = useRoute();

const Alert = inject("Alert");
let frmInfo = ref(null);

let pageMode = ref("add");
let form = ref({});
let platform = ref("Web");

let statusList = ref([]);

const headers = [
  { title: "", key: "action", sortable: false },
  { title: "Menu No", key: "Menu_No", sortable: true },
  { title: "Seq", key: "Menu_Seq", sortable: true },
  { title: "Name(EN)", key: "Menu_Name_EN", sortable: true },
  { title: "Name(TH)", key: "Menu_Name_TH", sortable: true },
  { title: "URL", key: "URL", sortable: true },
  { title: "Status", key: "Status", sortable: true },
];
let items = ref([]);

let isLoading = ref(false);
let currentPage = ref(1);
let pageSize = ref(20);
let totalItems = ref(0);

onMounted(() => {
  ddlApi.getPredefine({ group: "Is_Active", sortby: "text" }).then((data) => {
    statusList.value = data;
  });

  if (route.params.id) {
    pageMode.value = "edit";
    doLoadData(route.params.id);
  }
});

const doLoadData = (id) => {
  isLoading.value = true;
  // load data

  getMenuById(id).then((res) => {
    form.value = res;

    if (res.isWeb === "Y") {
      platform.value = "Web";
    } else if (res.isHandheld === "Y") {
      platform.value = "Hendheld";
    } else if (res.isTablet === "Y") {
      platform.value = "Tablet";
    }
    isLoading.value = false;
  });
};

const onSave = async () => {
  const { valid } = await frmInfo.value.validate();

  form.value.isWeb = platform.value === "Web" ? "Y" : "N";
  form.value.isHandheld = platform.value === "Hendheld" ? "Y" : "N";
  form.value.isTablet = platform.value === "Tablet" ? "Y" : "N";
  form.value.isMainMenu =
    !form.value.menuGroup || form.value.menuGroup === "" ? "Y" : "N";
  if (valid) {
    try {
      isLoading.value = true;
      if (pageMode.value === "add") {
        const res = await saveAdd(form.value);
      } else {
        const res = await saveEdit(form.value);
      }
      isLoading.value = false;
      await Alert.Success();
      router.back();
    } catch (error) {
      console.error(error);
      isLoading.value = false;
      Alert.Error("Error", error.message);
    }
  }
};

const onCancel = () => {
  router.back();
};
</script>
