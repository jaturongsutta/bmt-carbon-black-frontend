<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Role Permission</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <label>Role Name EN</label>
            <v-text-field v-model="formSearch.roleNameEn"></v-text-field>
          </v-col>
          <v-col>
            <label>Role Name TH</label>
            <v-text-field v-model="formSearch.roleNameTh"></v-text-field>
          </v-col>

          <v-col>
            <label>Status</label>
            <n-select
              v-model="formSearch.status"
              :items="[{ text: 'All', value: '' }, ...statusList]"
            ></n-select>
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
            <n-gbtn-edit @click="onEdit(item.Role_ID)"></n-gbtn-edit>
          </template>
          <template v-slot:bottom>
            <n-pagination
              v-model:currentPage="currentPage"
              v-model:itemPerPage="pageSize"
              v-model:totalItems="totalItems"
            ></n-pagination>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="900px" persistent>
      <v-form ref="frmInfo">
        <v-card>
          <v-card-title>
            <span class="headline">{{ mode }} Role Permission</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <label>Role Id </label>
                  <v-text-field v-model="form.roleId" readonly></v-text-field>
                </v-col>
                <v-col cols="3">
                  <label>Role Name TH </label>
                  <v-text-field
                    v-model="form.roleNameTh"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>

                <v-col cols="3">
                  <label>Value(EN) </label>
                  <v-text-field
                    v-model="form.roleNameEn"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>

                <v-col cols="3">
                  <label>Status </label>
                  <n-select
                    v-model="form.isActive"
                    :rules="[rules.required]"
                    :items="[...statusList]"
                  ></n-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-data-table
                    :headers="headersInfo"
                    :items="itemsInfo"
                    :v-model:items-per-page="-1"
                  >
                    <template v-slot:[`header.all`]="{}">
                      <v-checkbox
                        v-model="allHeader"
                        value="Y"
                        hide-details
                        @update:model-value="triggerAll"
                      ></v-checkbox>
                    </template>

                    <template v-slot:[`item.all`]="{ item }">
                      <v-checkbox
                        v-model="item.all"
                        value="Y"
                        hide-details
                        @update:model-value="
                          item.canAdd = item.all;
                          item.canUpdate = item.all;
                          item.canView = item.all;
                        "
                      ></v-checkbox>
                    </template>
                    <template v-slot:[`item.canAdd`]="{ item }">
                      <v-checkbox
                        v-model="item.canAdd"
                        value="Y"
                        hide-details
                      ></v-checkbox>
                    </template>
                    <template v-slot:[`item.canUpdate`]="{ item }">
                      <v-checkbox
                        v-model="item.canUpdate"
                        value="Y"
                        hide-details
                      ></v-checkbox>
                    </template>
                    <template v-slot:[`item.canView`]="{ item }">
                      <v-checkbox
                        v-model="item.canView"
                        value="Y"
                        hide-details
                      ></v-checkbox>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>
          <div class="d-flex justify-center py-3">
            <n-btn-save @click="saveClick" class="me-3"></n-btn-save>
            <n-btn-cancel text @click="dialog = false"></n-btn-cancel>
          </div>
        </v-card>
      </v-form>
    </v-dialog>

    <n-loading :loading="isLoading" />
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPaging } from "@/utils/utils.js";
import * as ddlApi from "@/api/dropdown-list.js";
import * as api from "@/api/common-master/role-permission.js";
import rules from "@/utils/rules";
import moment from "moment";
const Alert = inject("Alert");
const frmInfo = ref(null);
const router = useRouter();
let formSearch = ref({
  roleNameEn: "",
  roleNameTh: "",
  status: "",
});

const form = ref({});

const dialog = ref(false);

let statusList = ref([]);

const headers = [
  { title: "", key: "action", sortable: false },
  { title: "Role Name EN", key: "Role_Name_EN", sortable: true },
  { title: "Role Name TH", key: "Role_Name_TH", sortable: true },
  { title: "Status", key: "Status", sortable: true },
  { title: "Created By", key: "Created_By", sortable: true },
  {
    title: "Created Date",
    key: "Created_Date",
    sortable: true,
    value: (item) =>
      item.Created_Date
        ? moment(item.Created_Date).utc().format("DD/MM/YYYY HH:mm:ss")
        : "",
  },
  { title: "Updated By", key: "Updated_By", sortable: true },
  {
    title: "Updated Date",
    key: "Updated_Date",
    sortable: true,
    value: (item) =>
      item.Updated_Date
        ? moment(item.Updated_Date).utc().format("DD/MM/YYYY HH:mm:ss")
        : "",
  },
];
let items = ref([]);

let isLoading = ref(false);
let currentPage = ref(1);
let pageSize = ref(20);
let totalItems = ref(0);

const allHeader = ref(false);

const headersInfo = ref([
  { title: " ", key: "all" },
  { title: "Menu No", key: "menuNo" },
  { title: "Menu Name", key: "menuName" },
  { title: "Add", key: "canAdd" },
  { title: "Edit", key: "canUpdate" },
  { title: "View", key: "canView" },
]);

const itemsInfo = ref([]);

const mode = ref("Add");

onMounted(() => {
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
    roleNameEn: "",
    roleNameTh: "",
    status: "",
  };
  items.value = [];
  totalItems.value = 0;
};

const onAdd = () => {
  mode.value = "Add";
  form.value = {
    roleId: null,
    isActive: "Y",
  };
  itemsInfo.value = [];
  isLoading.value = true;
  api
    .getById("0")
    .then((res) => {
      isLoading.value = false;
      const itemsPermission = res.data.items;

      itemsPermission.forEach((item) => {
        item.all =
          item.canAdd === "Y" && item.canUpdate === "Y" && item.canView === "Y"
            ? "Y"
            : "N";
      });
      itemsInfo.value = itemsPermission;
    })
    .catch((e) => {
      console.error(e);
      isLoading.value = false;
      Alert.error(e.message);
    });
  dialog.value = true;
};

const onEdit = (id) => {
  mode.value = "Edit";
  dialog.value = true;
  isLoading.value = true;
  api
    .getById(id)
    .then((res) => {
      isLoading.value = false;
      form.value = res.data;
      const itemsPermission = res.data.items;
      itemsPermission.forEach((item) => {
        item.all =
          item.canAdd === "Y" && item.canUpdate === "Y" && item.canView === "Y"
            ? "Y"
            : "N";
      });
      itemsInfo.value = itemsPermission;
    })
    .catch((e) => {
      console.error(e);
      isLoading.value = false;
      Alert.error(e.message);
    });
};

const saveClick = async () => {
  try {
    const { valid } = await frmInfo.value.validate();
    if (!valid) return;
    let res = null;

    const data = {
      ...form.value,
      items: itemsInfo.value,
    };
    if (mode.value === "Add") {
      console.log("Add");
      res = await api.saveAdd(data);
    } else {
      console.log("Edit");
      res = await api.saveEdit(data.roleId, data);
    }

    if (res.status === 0) {
      Alert.success();
      dialog.value = false;
      onSearch();
    } else {
      Alert.warning(res.message);
    }
  } catch (error) {
    Alert.error(error.message);
  }
};
const triggerAll = (val) => {
  itemsInfo.value.forEach((item) => {
    item.all = val === "Y" ? "Y" : "N";
    item.canAdd = val === "Y" ? "Y" : "N";
    item.canUpdate = val === "Y" ? "Y" : "N";
    item.canView = val === "Y" ? "Y" : "N";
  });
};
</script>
