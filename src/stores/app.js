// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    minimalMenu: false,
  }),
  actions: {
    toggleMenu() {
      this.minimalMenu = !this.minimalMenu;
    },
  },
});
