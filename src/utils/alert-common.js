let app = null;

function initialAlert(_app) {
  app = _app;

  app.provide("$alert", {
    confirm: AlertConfirm,
    success: AlertSuccess,
    warning: AlertWarning,
    error: AlertError,
    fromResult: AlertFromResult,
  });
  app.provide("$AlertConfirm", AlertConfirm);
  app.provide("$AlertSuccess", AlertSuccess);
  app.provide("$AlertWarning", AlertWarning);
  app.provide("$AlertError", AlertError);
}

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
  return app.config.globalProperties.$swal.fire({
    title: title,
    icon: "success",
    customClass: {
      confirmButton: "btn bg-gradient-success",
    },
    buttonsStyling: false,
  });
}

function AlertWarning(title, detail) {
  if (title == undefined || title == null || title == "") {
    title = "Warring";
  }
  return app.config.globalProperties.$swal.fire({
    title: title,
    text: detail,
    icon: "warning",
    customClass: {
      confirmButton: "btn bg-gradient-warning",
    },
    buttonsStyling: false,
  });
}

function AlertError(title, detail) {
  if (title == undefined || title == null || title == "") {
    title = "Error";
  }
  return app.config.globalProperties.$swal.fire({
    title: title,
    text: detail,
    icon: "error",
    customClass: {
      confirmButton: "btn bg-gradient-danger",
    },
    buttonsStyling: false,
  });
}

// function AlertConfirm(msg) {
//   return app.config.globalProperties.$swal.fire({
//     // title: title,
//     text: msg,
//     icon: "warning",
//     showCancelButton: true,
//     cancelButtonText: "No",
//     confirmButtonText: "Yes",
//     buttonsStyling: false,
//     customClass: {
//       confirmButton: "btn bg-gradient-danger me-2",
//       cancelButton: "btn ",
//     },
//   });
// }

function AlertConfirm(msg1, msg2) {
  let option = {
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "No",
    confirmButtonText: "Yes",
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn bg-gradient-danger me-2",
      cancelButton: "btn ",
    },
  };

  if (msg2) {
    option.title = msg1;
    option.text = msg2;
  } else {
    option.text = msg1;
  }

  return app.config.globalProperties.$swal.fire(option);
}

export default {
  initialAlert,
};
