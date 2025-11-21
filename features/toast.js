// ==========================================
// Toast Notification
// ==========================================
function showToast(message, type = "danger") {
  const toastElement = document.getElementById("errorToast");
  const toastMessageElement = document.getElementById("toastMessage");

  // Set the message
  toastMessageElement.textContent = message;

  // Update toast type
  toastElement.className = `toast align-items-center text-bg-${type} border-0`;

  // Initialize and show the toast
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 3000,
  });

  toast.show();
}
