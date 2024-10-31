<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="dateFormated"
          mask="##/##/####"
          :label="mainProps.label"
          :readonly="mainProps.readonly"
          :disabled="mainProps.disabled"
          @blur="onBlur"
          @keydown="onKeydown"
          v-bind="mainProps.readonly || mainProps.disabled ? null : props"
          :hide-details="mainProps.hideDetails"
          :rules="mainProps.rules"
        >
          <template v-slot:append-inner>
            <v-icon icon="mdi mdi-calendar" class="cursor-pointer"></v-icon>
          </template>
        </v-text-field>
        <!-- <v-btn color="indigo" v-bind="props"> Menu as Popover </v-btn> -->
      </template>
      <VueDatePicker
        v-model="value"
        inline
        auto-apply
        :enable-time-picker="false"
        @update:model-value="handleChange"
        model-type="yyyy-MM-dd"
        :format="format"
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
  today: Boolean,
  hideDetails: Boolean,
  rules: Array,
});
const emit = defineEmits(["update:modelValue"]);

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

    if (mainProps.today) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      emit("update:modelValue", `${year}-${month}-${day}`);
    }
  }

  if (mainProps.modelValue) {
    const d = formatDate(mainProps.modelValue);
    tempDate = parseDate(d);
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
  if (!date) {
    return null;
  }

  if (date instanceof Date) {
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } else {
    let t = date.split("T");
    let [year, month, day] = t[0].split("-");
    // let hh = 0,
    //   mm = 0;
    // if (t[1]) {
    //   [hh, mm] = t[1].split(":");
    // }

    return `${day}/${month}/${year}`;
  }
}

watch(
  () => mainProps.modelValue,
  (newValue) => {
    if (newValue) {
      if (newValue instanceof Date) {
        newValue = parseDate(newValue);
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

function parseDate(datetime) {
  try {
    if (!datetime) {
      return null;
    }
    if (datetime instanceof Date) {
      return moment(datetime).format("YYYY-MM-DD");
    }

    // Regular expression to match the dd/MM/yyyy format
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!regex.test(datetime)) {
      console.warn("Date format is not dd/MM/yyyy");
      return null;
    }

    let sp = datetime.split(" ");

    let [day, month, year] = sp[0].split("/");
    const dateValue = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    const d = new Date(dateValue);
    if (d instanceof Date && !isNaN(d)) {
      return dateValue;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

function onBlur() {
  const date = parseDate(dateFormated.value);
  if (date === null) {
    dateFormated.value = "";
    emit("update:modelValue", null);
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
