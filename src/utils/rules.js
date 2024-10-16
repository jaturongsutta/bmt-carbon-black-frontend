const rules = {
  required: function (val) {
    if (val === undefined || val === null || val.length === 0) {
      return "This field is required";
    }
    return true;
  },
  integer: function (val) {
    if (!Number.isInteger(Number(val))) {
      return "This field must be an integer";
    }
    return true;
  },
};

export default rules;
// Compare this snippet from src/utils/rules.js:
