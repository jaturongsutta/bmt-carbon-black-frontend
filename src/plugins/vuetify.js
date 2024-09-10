/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
  },
  defaults: {
    // VField: {
    //   class: "text-body-2",
    // },
    // VListItemTitle: {
    //   class: "text-body-2",
    // },
    VTextField: {
      density: "compact",
      variant: "outlined",
      rounded: "lg",
    },
    VSelect: {
      density: "compact",
      variant: "outlined",
    },
    VAutocomplete: {
      density: "compact",
      variant: "outlined",
    },
    VCombobox: {
      density: "compact",
      variant: "outlined",
    },
    VBtn: {
      // rounded: "lg",
      class: "text-none font-weight-bold ",
    },
    VDataTable: {
      itemsPerPageOptions: [20, 25, 100],
      itemsPerPage: 25,
      hover: true,
    },
    VCard: {
      rounded: "lg",
      elevation: "5",
    },
    VCardText: {
      class: "pa-3",
    },
    VCol: {
      class: "pa-0  ps-3 pe-3",
    },
  },
});
