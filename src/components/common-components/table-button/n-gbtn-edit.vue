<template>
  <v-icon
    icon="mdi-pencil-outline"
    v-tooltip:end="'Edit'"
    class="text-warning"
    style="margin-left: 5px; margin-right: 5px"
    v-if="canAccess"
  ></v-icon>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
const route = useRoute();
const authStore = useAuthStore();
const props = defineProps({
  label: String,

  permission: {
    type: Boolean,
    default: true,
  },
});

let canAccess = ref(false);

onMounted(() => {
  const { meta } = route;
  if (props.permission) {
    // console.log("props", props.permission);
    // console.log("meta", meta.menuNo);
    if (meta.menuNo) {
      const access = authStore.permission.filter(
        (item) => item.Menu_No === meta.menuNo
      );
      if (access.length !== 0) {
        const { Can_Update } = access[0];
        if (Can_Update === "Y") {
          canAccess.value = true;
        } else {
          canAccess.value = false;
        }
      } else {
        canAccess.value = false;
        console.warn("Menu No missing in database premission");
        return;
      }
    } else {
      canAccess.value = false;
      console.warn("Menu No missing in route meta");
    }
  } else {
    canAccess.value = true;
  }
});
</script>
