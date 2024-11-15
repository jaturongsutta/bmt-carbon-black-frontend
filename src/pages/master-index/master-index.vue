<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Index</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <label>Line</label>
            <v-select
              v-model="formSearch.line"
              :items="[{ title: 'All', value: null }, ...lineList]"
            ></v-select>
          </v-col>
          <v-col>
            <label>Product Name</label>
            <v-select
              v-model="formSearch.product"
              :items="[{ title: 'All', value: null }, ...productList]"
            ></v-select>
          </v-col>
          <v-col>
            <label>Status</label>
            <v-select
              v-model="formSearch.status"
              :items="[{ title: 'All', value: null }, ...statusList]"
            ></v-select>
          </v-col>
        </v-row>

        <div class="row">
          <div class="d-flex justify-center">
            <n-btn-search @click="onSearch" />
            <n-btn-reset @click="onReset" class="ml-3" />
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="mt-3">
      <v-card-text>
        <n-btn-add label="Add" @click="onAdd"></n-btn-add>
        <v-data-table-server
          v-model:page="currentPage"
          v-model:items-per-page="pageSize"
          :headers="headers"
          :items="items"
          :items-length="totalItems"
          @update:options="loadData"
        >
          <template v-slot:[`item.action`]="{ item }">
            <n-gbtn-edit @click="onEdit(item.Master_Id)"></n-gbtn-edit>
            <n-gbtn-delete
              @click="onDelete(item.Master_Id)"
              :permission="false"
            ></n-gbtn-delete>
          </template>
          <template v-slot:bottom>
            <n-pagination
              v-model:currentPage="currentPage"
              v-model:itemPerPage="pageSize"
              v-model:totalItems="totalItems"
            ></n-pagination>
          </template>
        </v-data-table-server>
        <n-loading :loading="isLoading" />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="600px">
      <v-form ref="frmInfo">
        <v-card>
          <v-card-title>
            <span class="headline">{{ mode }} Index</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <label class="require-field">Line</label>
                  <v-select
                    v-model="form.lineId"
                    :items="lineList"
                    :rules="[rules.required]"
                    :readonly="mode === 'Edit'"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <label class="require-field">Product Name</label>
                  <v-select
                    v-model="form.productId"
                    :items="productList"
                    :rules="[rules.required]"
                    :readonly="mode === 'Edit'"
                  ></v-select>
                </v-col>

                <v-col cols="6">
                  <label class="require-field">Yield</label>
                  <n-input-number
                    v-model="form.yield"
                    :rules="[rules.required]"
                    :digit="3"
                  ></n-input-number>
                </v-col>
                <v-col cols="6">
                  <label class="require-field">R.H.</label>
                  <n-input-number
                    v-model="form.rH"
                    :rules="[rules.required]"
                  ></n-input-number>
                </v-col>
                <v-col cols="6">
                  <label class="require-field">Capacity Product Tank</label>
                  <n-input-number
                    v-model="form.capProdTank"
                    :rules="[rules.required]"
                  ></n-input-number>
                </v-col>

                <v-col cols="6">
                  <label class="require-field">Status </label>
                  <v-select
                    v-model="form.isActive"
                    :rules="[rules.required]"
                    :items="statusList"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>
          <div class="d-flex justify-center py-3">
            <n-btn-save @click="saveClick" class="me-3"></n-btn-save>
            <n-btn-cancel @click="closeClick"></n-btn-cancel>
          </div>
          <n-loading :loading="isLoadingPopup" />
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPaging } from "@/utils/utils.js";
import * as ddlApi from "@/api/dropdown-list.js";
import * as api from "@/api/master-index.js";
import rules from "@/utils/rules";
import moment from "moment";
import numeral from "numeral";
const Alert = inject("Alert");
const frmInfo = ref(null);
const router = useRouter();
let formSearch = ref({
  product: null,
  status: "Y",
});
let form = ref({});

const dialog = ref(false);

let statusList = ref([]);
let lineList = ref([]);
let productList = ref([]);

const headers = [
  { title: "", key: "action", sortable: false },
  { title: "Product Name", key: "Product_Name", sortable: false },
  {
    title: "YieId",
    key: "Yield",

    value: (item) => {
      return item.Yield ? numeral(item.Yield).format("0,0.000") : "";
    },
    sortable: false,
  },
  {
    title: "R.H.",
    key: "R_H",
    value: (item) => {
      return item.R_H ? numeral(item.R_H).format("0,0") : "";
    },
    sortable: false,
  },
  {
    title: "Capacity Product Tank",
    key: "Cap_Prod_Tank",
    value: (item) => {
      return item.Cap_Prod_Tank
        ? numeral(item.Cap_Prod_Tank).format("0,0")
        : "";
    },
    sortable: false,
  },
  { title: "Status", key: "Status", sortable: false },
  { title: "Created By", key: "Created_By", sortable: false },
  {
    title: "Created Date",
    key: "Created_Date",
    sortable: false,
    value: (item) => {
      return item.Created_Date
        ? moment(item.Created_Date).utc().format("DD/MM/YYYY HH:mm:ss")
        : "";
    },
  },
];
let items = ref([]);

let isLoading = ref(false);
let isLoadingPopup = ref(false);

let currentPage = ref(1);
let pageSize = ref(20);
let totalItems = ref(0);

const mode = ref("Add");

onMounted(() => {
  ddlApi.line().then((data) => {
    lineList.value = data;
  });
  ddlApi.product().then((data) => {
    productList.value = data;
  });
  ddlApi.getPredefine({ group: "Is_Active", sortby: "text" }).then((data) => {
    statusList.value = data;
  });
});

const onSearch = async () => {
  currentPage.value = 1;
  loadData({ page: currentPage.value, itemsPerPage: pageSize.value });
};

const loadData = async (paginate) => {
  const { page, itemsPerPage } = paginate;

  const searchOptions = getPaging({ page, itemsPerPage });

  try {
    isLoading.value = true;
    const data = {
      ...formSearch.value,
      searchOptions,
    };

    const response = await api.search(data);

    items.value = response.data;
    totalItems.value = response.total_record;
  } catch (error) {
    console.error("Error fetching API:", error);
    items.value = [];
    totalItems.value = 0;
  }
  isLoading.value = false;
};

const onReset = () => {
  formSearch.value = {
    product: null,
    status: "Y",
  };
  onSearch();
};

const clearData = () => {
  form.value = {
    masterId: null,
    productId: null,
    line: null,
    yield: null,
    rH: null,
    capProdTank: null,
    isActive: "Y",
  };
};

const onAdd = () => {
  mode.value = "Add";
  console.log("Add");
  clearData();
  dialog.value = true;
};

const onEdit = (id) => {
  mode.value = "Edit";
  dialog.value = true;
  clearData();

  isLoadingPopup.value = true;
  api.getById(id).then((res) => {
    console.log(res);
    isLoadingPopup.value = false;
    if (res.result.status === 0) {
      form.value.masterId = res.masterId;
      form.value.lineId = res.lineId;
      form.value.productId = res.productId ? res.productId.toString() : null;
      form.value.yield = res.yield;
      form.value.rH = res.rH;
      form.value.capProdTank = res.capProdTank;
      form.value.isActive = res.isActive;

      console.log(form.value);
    } else {
      Alert.warning(res.result.message);
      isLoadingPopup.value = false;
    }
  });
};

const saveClick = async () => {
  try {
    const { valid } = await frmInfo.value.validate();
    if (!valid) return;
    let res = null;
    isLoadingPopup.value = true;
    if (mode.value === "Add") {
      console.log("Add");
      res = await api.add(form.value);
    } else {
      console.log("Edit");
      res = await api.update(form.value.productId, form.value);
    }
    isLoadingPopup.value = false;

    if (res.status === 0) {
      Alert.success();
      dialog.value = false;
      onSearch();
    } else {
      Alert.warning(res.message);
    }
  } catch (error) {
    isLoadingPopup.value = false;
    Alert.error(error.message);
  }
};

const closeClick = () => {
  dialog.value = false;
};

const onDelete = (id) => {
  Alert.confirm("Are you sure you want to delete this index ?").then(
    ({ isConfirmed }) => {
      if (isConfirmed) {
        isLoading.value = true;
        api
          .remove(id)
          .then((res) => {
            isLoading.value = false;
            if (res.status === 0) {
              Alert.success("Delete successfully");
              onSearch();
            } else if (res.status === 1) {
              Alert.warning(res.message);
            } else {
              Alert.error(res.message);
            }
          })
          .catch((error) => {
            isLoading.value = false;
            console.error("Error fetching API:", error);
            Alert.error(error.message);
          });
      }
    }
  );
};
</script>
