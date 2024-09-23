<template>
  <v-card class="ma-5">
    <v-card-title>
      <h5>User</h5>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col>
          <label>Username</label>
          <v-text-field v-model="form.username"></v-text-field>
        </v-col>
        <v-col>
          <label>First Name</label>
          <v-text-field v-model="form.firstName"></v-text-field>
        </v-col>
        <v-col>
          <label>Last Name</label>
          <v-text-field v-model="form.lastName"></v-text-field>
        </v-col>
        <v-col>
          <label>Status</label>
          <n-select v-model="form.isActive" :items="statusList"></n-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="d-flex justify-center">
            <n-btn-save @click="onSave" />
            <n-btn-cancel @click="router.go(-1)" class="ml-3" />
          </div>
        </v-col>
      </v-row>
      <n-loading :loading="isLoading" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as api from "@/api/common-master/user.js";
import ddlApi from "@/api/dropdown-list.js";
const Alert = inject("Alert");
const route = useRoute();

const router = useRouter();
const form = ref({
  username: "",
  firstname: "",
  lastname: "",
  isActive: "Y",
});

const isLoading = ref(false);

const statusList = ref([]);
onMounted(() => {
  ddlApi.getPredefine({ group: "Is_Active", sortby: "text" }).then((data) => {
    statusList.value = data;
  });

  if (route.params.id) {
    const id = route.params.id;
    api.getById(id).then((res) => {
      console.log(res);
      form.value = res;
    });
  }
});

const onSave = async () => {
  isLoading.value = true;
  let res;

  try {
    if (route.params.id) {
      res = await api.updateUser(route.params.id, form.value);
    } else {
      res = await api.addUser(form.value);
    }

    isLoading.value = false;
    if (res.status === 0) {
      Alert.success();
      router.go(-1);
    } else {
      Alert.warning(res.message);
    }
  } catch (error) {
    isLoading.value = false;
    Alert.error("Error ", error.message);
  }
};
</script>
