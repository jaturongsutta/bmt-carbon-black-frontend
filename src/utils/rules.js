const rules = {
  required: function (val) {
    if (val === undefined || val === null || val.length === 0) {
      return "This field is required";
    }
    return true;
  },
};

export default rules;
// Compare this snippet from src/utils/rules.js:
