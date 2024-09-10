<template>
  <v-btn>
    {{ props.label }}
  </v-btn>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: String,
});
</script>
