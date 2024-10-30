<template>
  <v-text-field
    type="text"
    v-model="timeInput"
    @input="applyMask"
    placeholder="HH:mm"
    maxlength="5"
    @change="onInputUpdated"
    @keypress="onKeypress"
    append-inner-icon="mdi-clock-time-eight-outline"
  ></v-text-field>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
// Define props
const props = defineProps({
  modelValue: {
    type: String,
  },
});

// Define emits
const emit = defineEmits(["update:modelValue"]);

const timeInput = ref(null);

watch(
  () => props.modelValue,
  (newValue) => {
    timeInput.value = newValue;
  },
  { immediate: true }
);
watch(
  timeInput,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);

// watch(timeInput, (newValue) => {
//   emit("input", newValue);
// });

const onKeypress = (e) => {
  const key = e.key;
  const isValidKey = /[0-9:]/.test(key);

  if (!isValidKey) {
    e.preventDefault();
  }
};

const applyMask = () => {
  // let value = timeInput.value.replace(/\D/g, ""); // Remove non-numeric characters
  let value = timeInput.value;
  // Auto-insert colon after 2 digits (HH:mm format)
  if (value.length >= 3) {
    if (value.indexOf(":") === -1) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4);
      // Update the input value
      let [hours, minutes] = value.split(":");
      timeInput.value = [hours, minutes].filter(Boolean).join(":");
    } else {
      let [hours, minutes] = value.split(":");
      hours = hours.padStart(2, "0");
      minutes = minutes.padStart(2, "0");
      value = hours + ":" + minutes;
    }
  }
};

const onInputUpdated = () => {
  let value = timeInput.value;

  if (value.indexOf(":") !== -1) {
    let [hours, minutes] = value.split(":");
    hours = hours.padStart(2, "0");
    minutes = minutes.padStart(2, "0");
    value = hours + ":" + minutes;
  }

  if (value.indexOf(":") === -1 && value.length > 0) {
    value = value.padStart(2, "0") + ":00";
  }

  let [hours, minutes] = value.split(":");
  if (hours >= 24) {
    hours = "24";
    minutes = "00";
  } else if (minutes && minutes.length === 1) {
    minutes = "0" + minutes;
  }

  timeInput.value = [hours, minutes].filter(Boolean).join(":");
};
</script>
