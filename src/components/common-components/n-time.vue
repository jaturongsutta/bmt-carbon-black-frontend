<template>
  <div>
    <v-text-field
      type="text"
      v-model="timeInput"
      @input="applyMask"
      placeholder="HH:mm"
      maxlength="5"
      @change="onInputUpdated"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "TimeInput",
  data() {
    return {
      timeInput: "", // Holds the user input
    };
  },
  methods: {
    applyMask() {
      let value = this.timeInput.replace(/\D/g, ""); // Remove non-numeric characters

      // Auto-insert colon after 2 digits (HH:mm format)
      if (value.length >= 3) {
        value = value.slice(0, 2) + ":" + value.slice(2, 4);
      }

      // Only allow the value to have up to 5 characters ("HH:mm")
      value = value.slice(0, 5);

      // Parse hours and minutes
      let [hours, minutes] = value.split(":");

      // Ensure hours are between 00 and 24
      if (hours) {
        if (parseInt(hours) > 24) {
          hours = "24"; // Cap at 24
        } else if (hours.length === 2 && parseInt(hours) < 10) {
          hours = ("0" + hours).slice(-2); // Add leading zero for single digits
        }
      }

      // Ensure minutes are between 00 and 59
      if (minutes && parseInt(minutes) > 59) {
        minutes = "59"; // Cap at 59
      }

      console.log(hours, minutes);

      // Update the input value
      this.timeInput = [hours, minutes].filter(Boolean).join(":");
    },
    onInputUpdated(v) {
      console.log("onInputUpdated ");
      let value = this.timeInput.replace(/\D/g, ""); // Remove non-numeric characters

      // Auto-insert colon after 2 digits (HH:mm format)
      if (value.length >= 3) {
        value = value.slice(0, 2) + ":" + value.slice(2, 4);
      }
      let [hours, minutes] = value.split(":");
      if (hours >= 24) {
        minutes = "00";
        this.timeInput = [hours, minutes].filter(Boolean).join(":");
      }
    },
  },
};
</script>
