<template>
  <v-text-field
    v-model="inputDisplay"
    @keypress="onKeypress"
    @change="onInputUpdated"
  >
  </v-text-field>
</template>

<script setup>
/* eslint-disable */
import { defineProps, defineEmits, watch, ref } from "vue";
import numeral from "numeral";
const props = defineProps({
  modelValue: {},
  digit: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["update:modelValue", "onEnter"]);

const inputValue = ref(null);

const inputDisplay = ref(null);

watch(
  () => props.modelValue,
  (newValue) => {
    if (typeof newValue === "string") {
      // Handle the case where newValue is a string
      inputValue.value = parseValue(newValue);
    }
    // inputValue.value = convert newValue;
    inputDisplay.value = parseDisplay(newValue);
  }
);
watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});

// watch(
//   inputDisplay,
//   (newValue) => {
//     if (newValue && newValue.length > 0) {
//       inputValue.value = parseFloat(newValue);
//     } else {
//       inputValue.value = null;
//     }
//   },
//   { deep: true }
// );

const onKeypress = (e) => {
  const key = e.key;
  const isValidKey = /[0-9.]/.test(key);
  if (!isValidKey) {
    e.preventDefault();
  } else if (inputDisplay.value.indexOf(".") > -1 && key === ".") {
    e.preventDefault();
  }
};

const onInputUpdated = () => {
  inputDisplay.value = parseDisplay(inputDisplay.value);

  const num = inputDisplay.value.replace(/,/g, "");

  if (props.digit > 0) {
    emit("update:modelValue", parseFloat(num));
  } else {
    emit("update:modelValue", parseInt(num));
  }
};

const parseDisplay = (v) => {
  const numFormat = getFormatNumber();
  return numeral(v).format(numFormat);
};

const parseValue = (v) => {
  if (v) {
    const numStr = v.toString().replace(/,/g, "");
    if (props.digit > 0) {
      return parseFloat(numStr);
    } else {
      return parseInt(numStr);
    }
  } else {
    return null;
  }
};

function getFormatNumber() {
  let numFormat = "0,0";
  if (props.digit > 0) {
    numFormat += "." + "0".padEnd(props.digit, "0");
  }

  return numFormat;
}
</script>
