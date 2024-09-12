let app = null;
import Swal from "sweetalert2";
function initialAlert(_app) {
  app = _app;

  app.provide("Alert", {
    confirm: AlertConfirm,
    success: AlertSuccess,
    warning: AlertWarning,
    error: AlertError,
    fromResult: AlertFromResult,
  });
}
const alertCommon = {
  confirm: AlertConfirm,
  success: AlertSuccess,
  warning: AlertWarning,
  error: AlertError,
};

function AlertFromResult(result, successMessage) {
  if (result.status === 0) {
    return AlertSuccess(successMessage);
  } else if (result.status === 1) {
    return AlertWarning("", result.message);
  } else if (result.status === 2) {
    return AlertError("", result.message);
  } else {
    return AlertWarning("", "Please send parameter 'result'");
  }
}

function AlertSuccess(title) {
  if (title == undefined || title == null || title == "") {
    title = "Save successful";
  }
  return Swal.fire({
    title: title,
    icon: "success",
    customClass: {
      confirmButton: "btn-alert btn-alert-success",
    },
    buttonsStyling: false,
  });
}

function AlertWarning(title, detail) {
  if (title == undefined || title == null || title == "") {
    title = "Warring";
  }
  return Swal.fire({
    title: title,
    text: detail,
    icon: "warning",
    customClass: {
      confirmButton: "btn-alert btn-alert-warning",
    },
    buttonsStyling: false,
  });
}

function AlertError(title, detail) {
  console.log("AlertError", title, detail);
  if (title == undefined || title == null || title == "") {
    title = "Error";
  }
  return Swal.fire({
    title: title,
    text: detail,
    icon: "error",
    customClass: {
      confirmButton: "btn-alert btn-alert-error",
    },
    buttonsStyling: false,
  });
}

function AlertConfirm(msg1, msg2) {
  let option = {
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "No",
    confirmButtonText: "Yes",
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn-alert btn-alert-confirm me-2",
      cancelButton: "btn-alert btn-alert-cancel",
    },
  };

  if (msg2) {
    option.title = msg1;
    option.text = msg2;
  } else {
    option.text = msg1;
  }

  return Swal.fire(option);
}

export default alertCommon;
