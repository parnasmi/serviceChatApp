const config = {
  autoDismissTimeout: 3000,
  autoDismiss: true
};
const toast = {
  success: (message, toastFunc) => {
    toastFunc(message, { ...config, appearance: "success" });
  },
  error: (message, toastFunc) => {
    toastFunc(message, { ...config, appearance: "error" });
  }
};

export default toast;
