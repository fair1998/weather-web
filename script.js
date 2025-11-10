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
  weatherCard.classList.remove("sunny-bg", "cloudy-bg", "rainy-bg", "snowy-bg", "night-bg");

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

// Weather Data for Each Day
const weatherData = {
  Sun: {
    realFeel: "24°",
    wind: "12 km/h",
    rainChance: "45%",
    uvIndex: "6",
  },
  Mon: {
    realFeel: "32°",
    wind: "8 km/h",
    rainChance: "6%",
    uvIndex: "8",
  },
  Tue: {
    realFeel: "23°",
    wind: "18 km/h",
    rainChance: "40%",
    uvIndex: "4",
  },
  Wed: {
    realFeel: "26°",
    wind: "22 km/h",
    rainChance: "70%",
    uvIndex: "3",
  },
  Thu: {
    realFeel: "35°",
    wind: "10 km/h",
    rainChance: "10%",
    uvIndex: "9",
  },
  Fri: {
    realFeel: "25°",
    wind: "25 km/h",
    rainChance: "90%",
    uvIndex: "2",
  },
  Sat: {
    realFeel: "27°",
    wind: "15 km/h",
    rainChance: "50%",
    uvIndex: "5",
  },
};

// Update Air Conditions
function updateAirConditions(day) {
  const data = weatherData[day];

  if (!data) {
    console.error("ไม่พบข้อมูลสำหรับวัน:", day);
    return;
  }

  // อัปเดตข้อมูล Air Conditions
  document.getElementById("realFeel").textContent = data.realFeel;
  document.getElementById("windSpeed").textContent = data.wind;
  document.getElementById("rainPercent").textContent = data.rainChance;
  document.getElementById("uvIndex").textContent = data.uvIndex;

  // ลบ highlight จากทุกวันก่อน
  document.querySelectorAll(".forecast-item").forEach((item) => {
    item.style.backgroundColor = "";
    item.style.borderLeft = "";
  });

  // เพิ่ม highlight ให้วันที่คลิก
  event.target.closest(".forecast-item").style.backgroundColor = "rgba(102, 126, 234, 0.15)";
  event.target.closest(".forecast-item").style.borderLeft = "10px solid #78cee4ff";

  console.log("อัปเดตข้อมูลสำหรับวัน:", day, data);
}
