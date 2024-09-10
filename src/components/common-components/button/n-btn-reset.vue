<template>
  <v-btn prepend-icon="mdi mdi-refresh">
    <template v-slot:prepend>
      <v-icon size="large"></v-icon>
    </template>

    {{
      (props.label === null || props.label) === undefined
        ? "Reset"
        : props.label
    }}
  </v-btn>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: String,
});
</script>
