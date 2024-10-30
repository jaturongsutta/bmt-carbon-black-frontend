<template>
  <div>
    <v-text-field
      type="text"
      v-model="timeInput"
      @input="applyMask"
      placeholder="HH:mm"
      maxlength="5"
      @change="onInputUpdated"
      append-inner-icon="mdi-clock-time-eight-outline"
    ></v-text-field>
  </div>
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
    console.log("newValue ", newValue);

    emit("update:modelValue", newValue);
  },
  { deep: true }
);

// watch(timeInput, (newValue) => {
//   emit("input", newValue);
// });

const applyMask = () => {
  let value = timeInput.value.replace(/\D/g, ""); // Remove non-numeric characters

  // Auto-insert colon after 2 digits (HH:mm format)
  if (value.length >= 3) {
    value = value.slice(0, 2) + ":" + value.slice(2, 4);
  }

  // Only allow the value to have up to 5 characters ("HH:mm")
  value = value.slice(0, 5);

  // Parse hours and minutes
  let [hours, minutes] = value.split(":");

  // Ensure hours are between 00 and 24
  if (hours) {
    if (parseInt(hours) > 24) {
      hours = "24"; // Cap at 24
    } else if (hours.length === 2 && parseInt(hours) < 10) {
      hours = ("0" + hours).slice(-2); // Add leading zero for single digits
    }
  }

  // Ensure minutes are between 00 and 59
  if (minutes && parseInt(minutes) > 59) {
    minutes = "59"; // Cap at 59
  }

  // Update the input value
  timeInput.value = [hours, minutes].filter(Boolean).join(":");
};

const onInputUpdated = () => {
  console.log("onInputUpdated ");
  let value = timeInput.value.replace(/\D/g, ""); // Remove non-numeric characters

  // Auto-insert colon after 2 digits (HH:mm format)
  if (value.length >= 3) {
    value = value.slice(0, 2) + ":" + value.slice(2, 4);
  }
  let [hours, minutes] = value.split(":");
  console.log("minutes ", minutes);
  if (hours >= 24) {
    minutes = "00";
    timeInput.value = [hours, minutes].filter(Boolean).join(":");
  } else if (minutes && minutes.length === 1) {
    minutes = "0" + minutes;
    timeInput.value = [hours, minutes].filter(Boolean).join(":");
  }
};
</script>
