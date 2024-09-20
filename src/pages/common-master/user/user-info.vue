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
          <v-text-field v-model="form.firstname"></v-text-field>
        </v-col>
        <v-col>
          <label>Last Name</label>
          <v-text-field v-model="form.lastname"></v-text-field>
        </v-col>
        <v-col>
          <label>Status</label>
          <n-select v-model="form.isActive" :items="statusList"></n-select>
        </v-col>
      </v-row>
      <n-loading :loading="isLoading" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import ddlApi from "@/api/dropdown-list.js";
const route = useRoute();
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
});
</script>
