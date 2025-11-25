import { ref } from "vue";

const toasts = ref([]);
let toastId = 0;

export function useToast() {
  const showToast = (message, type = "info", duration = 4000) => {
    const id = toastId++;
    const toast = {
      id,
      message,
      type,
      duration,
    };

    toasts.value.push(toast);

    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const showSuccess = (message, duration) => {
    return showToast(message, "success", duration);
  };

  const showError = (message, duration) => {
    return showToast(message, "error", duration);
  };

  const showInfo = (message, duration) => {
    return showToast(message, "info", duration);
  };

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showInfo,
    removeToast,
  };
}
