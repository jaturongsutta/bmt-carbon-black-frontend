VisualSVN Server Mizuho_SourceCode / mis_front_iso / src / components /
CommonComponents / NInputNumber.vueRevision: HEAD Download
<template>
  <v-text-field
    ref="inputNumber"
    v-model="value"
    label-slot
    :rules="inputRules"
    :readonly="props.readonly"
    :disable="disable"
    type="number"
  >
  </v-text-field>
</template>

<script setup>
/* eslint-disable */
import {
  defineProps,
  defineEmits,
  defineExpose,
  computed,
  onMounted,
  watch,
  ref,
} from "vue";
import numeral from "numeral";
const props = defineProps({
  label: String,
  modelValue: Number,
  digit: Number,
  isPositive: Boolean,
  rules: Array,
  isLabelRequire: Boolean /* is-label-require */,
  readonly: Boolean,
  disable: Boolean,
  displayValue: String,
  autofocus: Boolean,
});
const emit = defineEmits(["update:modelValue", "onEnter"]);

let inputNumber = ref(null);
const maxValue = 8796000000000; // javascript overflow
let nDegit = ref(0);
let inputRules = ref([]);
onMounted(() => {
  inputRules.value = [ruleValidateMax];
  if (props.rules) {
    inputRules.value = [ruleValidateMax, ...props.rules];
  }

  if (props.digit != null) {
    nDegit.value = props.digit;
  }
});

watch(
  () => props.digit,
  (newValue) => {
    nDegit.value = newValue;

    if (props.modelValue != null && props.modelValue != "") {
      const num = props.modelValue.toFixed(nDegit.value);
      onChange(num);
    }
  }
);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

function numberDisplay(v) {
  let txt = "";
  if (typeof v !== "undefined" && v !== null) {
    let numFormat = getFormatNumber();
    txt = numeral(v).format(numFormat);
  }
  return txt;
}

function onChange(txt) {
  if (txt === null || txt === "" || txt === "-") {
    emit("update:modelValue", null);
    emit("update:displayValue", "");
  } else {
    const val = numeral(txt);
    emit("update:modelValue", val.value());
    emit("update:displayValue", numberDisplay(txt));

    // var s = txt.toString().replaceAll(",", "");
    // if (s.indexOf("." > -1)) {
    //   var sp = s.split(".");
    //   s = sp[0];
    // }
    // if (parseInt(s) > maxValue) {
    //   emit("update:modelValue", null);
    // } else {
    //   const val = numeral(txt);
    //   emit("update:modelValue", val.value());
    // }
  }
}

/* eslint-disable */
function monkeyKeydown(e, modelValue, emitValue) {
  const keyCode = e.keyCode;
  const key = e.key;
  const val = e.target.value;
  //console.log("keyCode : ", keyCode, "  key : ", key, " e.ctrlKey ", e.ctrlKey);

  if (e.shiftKey) {
    e.preventDefault();
    return;
  }

  // var reg = /[0-9\.\-]/;
  // if (props.isPositive) {
  //   reg = /[0-9\.]/;
  // }

  // var c = appRule.validateReg(reg, key);
  // if (!c) {
  //   e.preventDefault();
  //   return;
  // }
  // if (keyCode != 8 && keyCode != 13) {
  //   // Backspace ,Enter
  //   e.preventDefault();
  //   return;
  // }

  if (val.split(".").length > 1 && key == ".") {
    e.preventDefault();
    return;
  }

  if (val.split("-").length > 1 && key == "-") {
    e.preventDefault();
    return;
  }

  if (e.ctrlKey === true && (key === "a" || key === "c" || key === "v")) {
    return; // allow copy, paste, select all
  }

  const keyNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  if (
    !(
      keyNumber.indexOf(key) > -1 ||
      // (keyCode >= 48 && keyCode <= 57) ||
      // (keyCode >= 96 && keyCode <= 105) ||
      key === "-" ||
      key === "." ||
      keyCode === 8 ||
      keyCode === 37 ||
      keyCode === 39
    )
  ) {
    e.preventDefault();
    return;
  }
}

function ruleValidateMax(val) {
  if (val >= maxValue) {
    return "Maximum value is " + numeral(maxValue).format("0,0");
  } else if (val <= maxValue * -1) {
    return "Minimum value is -" + numeral(maxValue).format("0,0");
  } else {
    return null;
  }
}

function getFormatNumber() {
  let numFormat = "0,0";
  if (nDegit.value > 0) {
    numFormat += "." + "0".padEnd(nDegit.value, "0");
  }

  return numFormat;
}

function onKeyEnter() {
  emit("onEnter", null);
}
</script>
Powered by VisualSVN Server. © 2019 VisualSVN Software Ltd.
