<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="menuRouteId"
      :items-per-page="-1"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ props }">
              <n-btn-add class="mb-2" v-bind="props"> New Item </n-btn-add>
            </template>
            <v-card>
              <v-form ref="frmInfo" @submit.prevent="save">
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <label>Route Name</label>
                        <v-text-field
                          v-model="editedItem.routeName"
                          :rules="[rules.isRequire]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <label>Route Path</label>
                        <v-text-field
                          v-model="editedItem.routePath"
                          :rules="[rules.isRequire]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <label>Physical Path</label>
                        <v-text-field
                          v-model="editedItem.physicalPath"
                          :rules="[rules.isRequire]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-checkbox
                          v-model="editedItem.isRequireAuth"
                          label="Is Require Authentication"
                          :rules="[rules.isRequire]"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" type="submit">
                    Save
                  </v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="close">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <n-gbtn-edit @click="editItem(item)"></n-gbtn-edit>
        <n-gbtn-delete @click="deleteItem(item)"></n-gbtn-delete>
      </template>
      <template v-slot:[`item.isRequireAuth`]="{ item }">
        <v-icon class="me-2" size="small" v-if="item.isRequireAuth">
          mdi-check
        </v-icon>
      </template>
    </v-data-table>
    <n-loading :loading="isLoading" />
  </div>
</template>

<script setup>
import { onMounted, ref, inject, nextTick, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import rules from "@/utils/rules.js";

import {
  getMenuRouteByMenuNo,
  saveAddMenuRoute,
  saveEditMenuRoute,
  deleteMenuRoute,
} from "@/api/common-master/menu.js";

const router = useRouter();
const route = useRoute();
const Alert = inject("Alert");

const frmInfo = ref(null);
let pageMode = ref("add");
let form = ref({});

let dialog = ref(false);

const headers = [
  { title: "", key: "action", sortable: false, width: "80px" },
  { title: "Menu No", key: "menuNo", sortable: true },
  { title: "Name", key: "routeName", sortable: true },
  { title: "Path", key: "routePath", sortable: true },
  { title: "Physical Path", key: "physicalPath", sortable: true },
  {
    title: "isRequireAuth",
    key: "isRequireAuth",
    sortable: false,
    align: "center",
  },
];
let items = ref([]);

let isLoading = ref(false);

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Route" : "Edit Route";
});

const editedIndex = ref(-1);
let editedItem = ref({
  menuRouteId: null,
  routeName: "",
  routePath: "",
  physicalPath: "",
  isRequireAuth: true,
});

let defaultItem = {
  menuRouteId: null,
  routeName: "",
  routePath: "",
  physicalPath: "",
  isRequireAuth: true,
};

onMounted(() => {
  if (route.params.id) {
    pageMode.value = "edit";
    doLoadData(route.params.id);
  }
});

const doLoadData = () => {
  isLoading.value = true;
  getMenuRouteByMenuNo(route.params.id)
    .then((res) => {
      items.value = res;
      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err);
      isLoading.value = false;
      Alert.Error("Error", err.message);
    });
};

const editItem = (item) => {
  editedIndex.value = items.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const save = async () => {
  const { valid } = await frmInfo.value.validate();
  if (!valid) return;

  if (editedItem.value.menuRouteId === null) {
    editedItem.value.menuNo = route.params.id;
    const res = await saveAddMenuRoute(editedItem.value);
  } else {
    const res = await saveEditMenuRoute(editedItem.value);
  }

  close();
  await Alert.Success();

  doLoadData();
};

const deleteItem = (item) => {
  Alert.Confirm("Are you sure you want to delete this item?").then((c) => {
    if (c.isConfirmed) {
      deleteMenuRoute(item.menuRouteId).then(() => {
        if (router.hasRoute(item.routeName)) {
          router.removeRoute(item.routeName);
        }
        doLoadData();
      });
    }
  });
  // editedIndex.value = desserts.value.indexOf(item);
  // editedItem.value = Object.assign({}, item);
  // dialogDelete.value = true;
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem);
    editedIndex.value = -1;
  });
};
</script>
