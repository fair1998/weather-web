// ==========================================
// Theme Management
// ==========================================
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

function loadTheme() {
  const savedTheme = localStorage.getItem("weatherAppTheme") || "dark";
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  const icon = themeToggle.querySelector("i");

  if (theme === "dark") {
    icon.className = "bi bi-sun";
  } else {
    icon.className = "bi bi-moon-stars";
  }
}

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  applyTheme(newTheme);
  localStorage.setItem("weatherAppTheme", newTheme);
});

// ==========================================
// Initialize App
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  startClock();
});

function startClock() {
  const timeElement = document.getElementById("localTime");

  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // รูปแบบเวลา HH:MM:SS
    const timeString = `${hours}:${minutes}:${seconds}`;
    timeElement.textContent = timeString;
  }

  updateTime(); // แสดงทันที
  setInterval(updateTime, 1000); // อัปเดตทุกวินาที
}

