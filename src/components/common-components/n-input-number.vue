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
import { defineProps, defineEmits, watch, ref, nextTick } from "vue";
import numeral from "numeral";
const props = defineProps({
  modelValue: {},
  digit: {
    type: Number,
    default: 0,
  },
  nullable: {
    type: Boolean,
    default: false,
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

    nextTick(() => {
      inputDisplay.value = parseDisplay(newValue);
    });
  },
  { deep: true }
);
watch(
  inputValue,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);

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
  } else if (
    inputDisplay.value &&
    inputDisplay.value.indexOf(".") > -1 &&
    key === "."
  ) {
    e.preventDefault();
  }
};

const onInputUpdated = (e) => {
  const v = e.target.value;

  if (v === null || v === "") {
    inputValue.value = props.nullable ? null : 0;
    inputDisplay.value = parseDisplay(v);
    return;
  }

  inputDisplay.value = parseDisplay(v);

  const num = inputDisplay.value.replace(/,/g, "");

  if (props.digit > 0) {
    inputValue.value = parseFloat(num);
  } else {
    inputValue.value = parseInt(num);
  }
};

const parseDisplay = (v) => {
  const numFormat = getFormatNumber();
  if (v && v !== "") {
    return numeral(v).format(numFormat);
  } else {
    return props.nullable ? "" : numeral(0).format(numFormat);
  }
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
