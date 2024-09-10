<template>
  <v-btn
    prepend-icon="mdi mdi-file-document-arrow-right-outline"
    v-show="canAccess"
    class="bg-gradient-info export-btn"
  >
    <template v-slot:prepend>
      <v-icon color="write" size="large"></v-icon>
    </template>

    {{
      (props.label === null || props.label) === undefined
        ? "Export"
        : props.label
    }}
  </v-btn>
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
    if (meta.menuNo) {
      const access = authStore.permission.filter(
        (item) => item.Menu_No === meta.menuNo
      );
      if (access.length !== 0) {
        const { Can_View } = access[0];

        if (Can_View === "Y") {
          canAccess.value = true;
        } else {
          canAccess.value = false;
          console.warn("User does not have permission to add");
          return;
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
  }
});
</script>

<style scoped>
.export-btn {
  background-image: linear-gradient(310deg, #1171ef 0%, #11cdef 100%);
  color: #fff;
}
</style>
