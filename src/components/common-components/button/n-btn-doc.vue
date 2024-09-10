<template>
  <v-btn
    prepend-icon="mdi mdi-file-excel"
    class="text-none"
    color="grey-lighten-4"
  >
    {{ label }}
  </v-btn>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: String,
});
</script>
