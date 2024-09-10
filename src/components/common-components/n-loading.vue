<template>
  <v-overlay
    :model-value="loading"
    class="align-center justify-center"
    contained
  >
    <v-progress-circular
      color="primary"
      size="64"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  loading: Boolean,
});
</script>
