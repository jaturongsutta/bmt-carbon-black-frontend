<template>
  <div>
    <div class="pe-2 pb-2">
      <n-btn-back
        label="Back"
        @click="
          () => {
            router.back();
          }
        "
      />
    </div>
    <div>
      <pre>{{ content }}</pre>
      <n-loading :loading="isLoading" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";

import * as api from "@/api/common-master/application-log";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const Alert = inject("$Alert");

const isLoading = ref(false);

const content = ref("");

onMounted(() => {
  console.log("mounted");
  isLoading.value = true;
  const logtype = route.params.logtype;
  const filename = route.params.filename;

  api
    .getContentLog(logtype, filename)
    .then((res) => {
      content.value = res;

      isLoading.value = false;
    })
    .catch((err) => {
      console.error(err);
      Alert.Error(err.message);
      isLoading.value = false;
    });
});
</script>

<style scoped>
pre {
  font-size: 0.8em;
  background-color: #f5f5f5; /* Light grey background */
  border: 1px solid #ccc; /* Light border for distinction */
  border-radius: 4px;
  padding: 20px;
  overflow-x: auto; /* Allows horizontal scrolling if line is too long */
  /* white-space: pre-wrap;  
  word-wrap: break-word;   */
  font-family: monospace; /* Ensures text is displayed in a monospace font */
}
</style>
