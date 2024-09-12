<template>
  <div class="ps-2">
    <div class="float-start mt-2">
      <v-select
        v-model="itemPerPageValue"
        :items="['20', '50', '100']"
        variant="outlined"
        density="compact"
        @update:modelValue="itemPerPageChange"
      ></v-select>
    </div>
    <div class="float-start mt-4">
      <div class="text-subtitle-1">
        &nbsp;&nbsp; per page of {{ totalItems }} items
      </div>
    </div>

    <v-pagination
      class="float-end"
      v-model="currentPageValue"
      :length="pageCount"
      :total-visible="7"
      @update:modelValue="currentPageChange"
    ></v-pagination>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  currentPage: Number,
  itemPerPage: Number,
  totalItems: Number,
});

const emit = defineEmits([
  "update:currentPage",
  "update:totalItems",
  "update:itemPerPage",
  "onChangeItemPerPage",
  "onChangePaging",
]);

const _currentPage = ref(props.currentPage); // Source data

let currentPageValue = computed(
  () => {
    return props.currentPage;
  },
  (newvalue2) => {
    console.log("currentPage new-value", newvalue2);
    emit("update:currentPage", newvalue2);
  }
);

// watch(_currentPage, (newVal, oldVal) => {
//   console.log("_currentPage watch", newVal, "  ", oldVal);
//   emit("update:currentPage", newVal);
// });

let totalItemsValue = computed(
  () => {
    return props.totalItems;
  },
  (newvalue) => {
    console.log("totalItemsValue new-value", newvalue);
    emit("update:totalItems", newvalue);
  }
);

let itemPerPageValue = computed(
  () => {
    return props.itemPerPage;
  },
  (newvalue) => {
    console.log("itemPerPageValue new-value", newvalue);
    emit("update:itemPerPage", newvalue);
  }
);

let pageCount = computed(() => {
  return Math.ceil(totalItemsValue.value / itemPerPageValue.value);
});

const itemPerPageChange = (value) => {
  console.log("itemPerPageChange", value);
  emit("update:itemPerPage", value);
  emit("onChangeItemPerPage", value);
};

const currentPageChange = (value) => {
  console.log("currentPageChange", value);
  emit("update:currentPage", value);
  emit("onChangePaging", value);
};
</script>
