<template>
  <div class="mx-4">
    <v-card class="py-4">
      <v-tabs v-model="tab">
        <v-tab value="one">Combined</v-tab>
        <v-tab value="two">Error</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <log-detail-list></log-detail-list>
          </v-tabs-window-item>

          <v-tabs-window-item value="two">
            <log-error-list></log-error-list>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import logDetailList from "@/components/application-log/log-detail-list.vue";
import logErrorList from "@/components/application-log/log-error-list.vue";
const tab = ref("one");
</script>

<style></style>
