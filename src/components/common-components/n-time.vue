<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="dateFormated"
          :label="mainProps.label"
          :readonly="mainProps.readonly"
          :disabled="mainProps.disabled"
          v-bind="mainProps.readonly || mainProps.disabled ? null : props"
          :hide-details="mainProps.hideDetails"
          :rules="mainProps.rules"
          @blur="onBlur"
          @keydown="onKeydown"
        >
          <template v-slot:append-inner>
            <v-icon
              icon="mdi mdi-clock-time-three-outline"
              class="cursor-pointer"
            ></v-icon>
          </template>
        </v-text-field>
        <!-- <v-btn color="indigo" v-bind="props"> Menu as Popover </v-btn> -->
      </template>
      <VueDatePicker
        v-model="value"
        inline
        time-picker
        :model-type="format"
        @update:model-value="handleChange"
        @invalid-select="handleInvalidSelect"
      />
    </v-menu>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import { computed, defineProps, defineEmits, ref, watch, onMounted } from "vue";
const mainProps = defineProps({
  label: String,
  modelValue: String,
  readonly: Boolean,
  class: String,
  now: Boolean,
  hideDetails: Boolean,
  rules: Array,
});
const emit = defineEmits(["update:modelValue"]);

const format = "HH:mm";
const menu = ref(false);

const dateFormated = ref("");

let tempDate = null;

onMounted(() => {
  if (mainProps.modelValue) {
    emit("update:modelValue", mainProps.modelValue);
    dateFormated.value = formatDate(mainProps.modelValue);
  } else {
    emit("update:modelValue", null);
    dateFormated.value = null;

    if (mainProps.now) {
      const currentDate = new Date();
      const hh = currentDate.getHours().toString().padStart(2, "0");
      const mm = currentDate.getMinutes().toString().padStart(2, "0");

      emit("update:modelValue", `${hh}:${mm}`);
    }
  }

  if (mainProps.modelValue) {
    const d = formatDate(mainProps.modelValue);
    tempDate = parseTime(d);
  }
});

const handleChange = (v) => {
  menu.value = false;

  if (tempDate !== v) {
    emit("update:modelValue", v);
    dateFormated.value = formatDate(v);
    tempDate = v;
  }
};

function formatDate(date) {
  console.log("formatDate", date);
  if (!date) {
    return null;
  }

  if (date instanceof Date) {
    let hh = (date.getHours() + 1).toString().padStart(2, "0");
    let mm = (date.getMinutes() + 1).toString().padStart(2, "0");

    return `${hh}:${mm}`;
  } else {
    let [hh, mm] = date.split(":");

    return `${hh}:${mm}`;
  }
}

watch(
  () => mainProps.modelValue,
  (newValue) => {
    if (newValue) {
      if (newValue instanceof Date) {
        newValue = parseTime(newValue);
        emit("update:modelValue", newValue);
      }
    }
    dateFormated.value = formatDate(newValue);
  }
);

const value = computed({
  get() {
    return mainProps.modelValue;
  },
  set(value) {
    if (value !== tempDate) {
      emit("update:modelValue", value);
      dateFormated.value = formatDate(value);
      tempDate = value;
    }
  },
});

function parseTime(time) {
  console.log("parseTime", time);
  try {
    if (!time) {
      return null;
    }
    // Regular expression to match the HH:mm format
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!regex.test(time)) {
      console.warn("Time format is not HH:mm");
      return null;
    }

    // Splitting the time input
    let [hours, minutes] = time.split(":");

    // Ensuring hours and minutes are properly formatted
    const timeValue = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;

    // No Date object validation needed, regex ensures valid time
    return timeValue;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function onBlur() {
  const date = parseTime(dateFormated.value);
  if (date === null) {
    dateFormated.value = "";
  }

  if (tempDate !== date) {
    emit("update:modelValue", date);
    tempDate = date;
  }
}

const onKeydown = (e) => {
  if (
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "/",
      "Backspace",
      "Delete",
      "Tab",
    ].indexOf(e.key) > -1
  ) {
    return;
  } else if (e.ctrlKey && (e.key == "c" || e.key == "v")) {
    return;
  }

  e.preventDefault();
};
</script>
