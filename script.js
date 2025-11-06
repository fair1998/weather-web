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


// ฟังก์ชันสำหรับเปลี่ยนสีพื้นหลังตามสภาพอากาศ
function updateWeatherBackground(condition) {
  const weatherCard = document.querySelector(".weather-card");

  // เคลียร์คลาสเก่าออกก่อน
  weatherCard.classList.remove(
    "sunny-bg",
    "cloudy-bg",
    "rainy-bg",
    "snowy-bg",
    "night-bg"
  );

  // เพิ่มคลาสใหม่ตามสภาพอากาศ
  if (condition.includes("sun")) {
    weatherCard.classList.add("sunny-bg");
  } else if (condition.includes("cloud")) {
    weatherCard.classList.add("cloudy-bg");
  } else if (condition.includes("rain")) {
    weatherCard.classList.add("rainy-bg");
  } else if (condition.includes("snow")) {
    weatherCard.classList.add("snowy-bg");
  } else {
    weatherCard.classList.add("night-bg");
  }
}

// ตัวอย่างการทดสอบ (ตอนข้อมูลสภาพอากาศเสร็จแล้วค่อยผูกจริง)
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  startClock();

  // ทดสอบ: เปลี่ยนเป็น "sunny", "rainy" หรือ "cloudy"
  updateWeatherBackground("cloud");
});
