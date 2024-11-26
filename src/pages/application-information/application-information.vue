<template lang="">
  <div>
    <v-card>
      <v-card-title> Application Information </v-card-title>

      <v-card-text>
        <h4>Deployment</h4>
        <v-list lines="one">
          <v-list-item>
            <v-list-item-title>Frontend</v-list-item-title>
            <v-list-item-subtitle
              v-text="appDeploymentFrontend"
            ></v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Backend</v-list-item-title>
            <v-list-item-subtitle
              v-text="appDeploymentBackend"
            ></v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
  setup() {
    const appDeploymentFrontend = ref(import.meta.env.VITE_GIT_COMMIT_LOG);
    const appDeploymentBackend = ref("-");

    onMounted(() => {
      axios.get(`//last-commit`).then((response) => {
        appDeploymentBackend.value = response.data;
      });
    });

    return {
      appDeploymentFrontend,
      appDeploymentBackend,
    };
  },
};
</script>
