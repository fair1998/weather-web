// ==========================================
// Toast Notification
// ==========================================
function showToast(message) {
  const toastElement = document.getElementById("errorToast");
  const toastMessageElement = document.getElementById("toastMessage");

  // Set the message
  toastMessageElement.textContent = message;

  // Initialize and show the toast
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 3000,
  });

  toast.show();
}
