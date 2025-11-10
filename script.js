// ==========================================
// MOCK WEATHER DATA
// ==========================================
// === Mock Data (จังหวัดในประเทศไทย) ===
const mockWeatherData = {
  "กรุงเทพมหานคร": { temperature: 33, rainChance: "40%", icon: "bi-cloud-sun-fill", condition: "sunny", localTime: "10:00 น." },
  "เชียงใหม่": { temperature: 28, rainChance: "30%", icon: "bi-sun-fill", condition: "sunny", localTime: "10:00 น." },
  "ภูเก็ต": { temperature: 31, rainChance: "60%", icon: "bi-cloud-rain-fill", condition: "rainy", localTime: "10:00 น." },
  "ขอนแก่น": { temperature: 32, rainChance: "25%", icon: "bi-sun-fill", condition: "sunny", localTime: "10:00 น." },
  "นครราชสีมา": { temperature: 31, rainChance: "35%", icon: "bi-cloud-fill", condition: "cloudy", localTime: "10:00 น." },
  "ชลบุรี": { temperature: 30, rainChance: "45%", icon: "bi-cloud-rain-fill", condition: "rainy", localTime: "10:00 น." },
  "สงขลา": { temperature: 33, rainChance: "55%", icon: "bi-cloud-rain-fill", condition: "rainy", localTime: "10:00 น." },
  "นครศรีธรรมราช": { temperature: 32, rainChance: "70%", icon: "bi-cloud-lightning-rain-fill", condition: "rainy", localTime: "10:00 น." },
  "สุราษฎร์ธานี": { temperature: 31, rainChance: "50%", icon: "bi-cloud-rain-fill", condition: "rainy", localTime: "10:00 น." },
  "อุดรธานี": { temperature: 29, rainChance: "20%", icon: "bi-sun-fill", condition: "sunny", localTime: "10:00 น." },
  "พิษณุโลก": { temperature: 30, rainChance: "25%", icon: "bi-sun-fill", condition: "sunny", localTime: "10:00 น." },
  "นครสวรรค์": { temperature: 32, rainChance: "35%", icon: "bi-cloud-fill", condition: "cloudy", localTime: "10:00 น." },
  "ระยอง": { temperature: 31, rainChance: "45%", icon: "bi-cloud-rain-fill", condition: "rainy", localTime: "10:00 น." },
  "ตรัง": { temperature: 30, rainChance: "60%", icon: "bi-cloud-rain-fill", condition: "rainy", localTime: "10:00 น." },
  "แม่ฮ่องสอน": { temperature: 27, rainChance: "15%", icon: "bi-sun-fill", condition: "sunny", localTime: "10:00 น." },
};


// ==========================================
// TOAST FUNCTION
// ==========================================
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "8px";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0.9";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ==========================================
// DISPLAY WEATHER
// ==========================================
function displayWeather(city) {
  const data = mockWeatherData[city];
  if (!data) return;

  document.getElementById("cityName").textContent = city;
  document.getElementById("localTime").textContent = `Local time: ${data.localTime}`;
  document.getElementById("rainChance").textContent = `Rain chance: ${data.rainChance}`;
  document.getElementById("temperature").textContent = data.temperature;
  document.getElementById("weatherIcon").className = `bi ${data.icon} text-warning`;

  updateWeatherBackground(data.condition);
  localStorage.setItem("lastCity", city);
}

// ==========================================
// WEATHER BACKGROUND (รวม version เดียว)
// ==========================================
function updateWeatherBackground(condition) {
  const weatherCard = document.querySelector(".weather-card");
  weatherCard.classList.remove("sunny-bg", "cloudy-bg", "rainy-bg", "snowy-bg", "night-bg");

  if (condition.includes("sun")) weatherCard.classList.add("sunny-bg");
  else if (condition.includes("cloud")) weatherCard.classList.add("cloudy-bg");
  else if (condition.includes("rain")) weatherCard.classList.add("rainy-bg");
  else if (condition.includes("snow")) weatherCard.classList.add("snowy-bg");
  else weatherCard.classList.add("night-bg");
}

// ==========================================
// LOAD LAST CITY
// ==========================================
function loadLastCity() {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity && mockWeatherData[lastCity]) displayWeather(lastCity);
  else displayWeather("London");
}

// ==========================================
// POPULATE CITY DATALIST
// ==========================================
function populateCityDatalist() {
  const datalist = document.getElementById("citiesList");
  datalist.innerHTML = "";
  Object.keys(mockWeatherData).forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    datalist.appendChild(option);
  });
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
function searchCity() {
  const input = document.getElementById("citySearch");
  const city = input.value.trim();
  const found = Object.keys(mockWeatherData).find(
    (c) => c.toLowerCase() === city.toLowerCase()
  );

  if (found) displayWeather(found);
  else showToast("ไม่พบจังหวัดที่คุณค้นหา");
}

// ==========================================
// THEME MANAGEMENT
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

  if (theme === "dark") icon.className = "bi bi-sun";
  else icon.className = "bi bi-moon-stars";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  applyTheme(newTheme);
  localStorage.setItem("weatherAppTheme", newTheme);
});

// ==========================================
// CLOCK
// ==========================================
function startClock() {
  const timeElement = document.getElementById("localTime");

  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// ==========================================
// AIR CONDITIONS (ข้อมูลรายวัน)
// ==========================================
const weatherData = {
  Sun: { realFeel: "24°", wind: "12 km/h", rainChance: "45%", uvIndex: "6" },
  Mon: { realFeel: "30°", wind: "8 km/h", rainChance: "6%", uvIndex: "8" },
  Tue: { realFeel: "23°", wind: "18 km/h", rainChance: "40%", uvIndex: "4" },
  Wed: { realFeel: "26°", wind: "22 km/h", rainChance: "70%", uvIndex: "3" },
  Thu: { realFeel: "35°", wind: "10 km/h", rainChance: "10%", uvIndex: "9" },
  Fri: { realFeel: "25°", wind: "25 km/h", rainChance: "90%", uvIndex: "2" },
  Sat: { realFeel: "27°", wind: "15 km/h", rainChance: "50%", uvIndex: "5" },
};

function updateAirConditions(day, event) {
  const data = weatherData[day];
  if (!data) return console.error("ไม่พบข้อมูลสำหรับวัน:", day);

  document.getElementById("realFeel").textContent = data.realFeel;
  document.getElementById("windSpeed").textContent = data.wind;
  document.getElementById("rainPercent").textContent = data.rainChance;
  document.getElementById("uvIndex").textContent = data.uvIndex;

  document.querySelectorAll(".forecast-item").forEach((item) => {
    item.style.backgroundColor = "";
    item.style.borderLeft = "";
  });

  if (event) {
    const selected = event.target.closest(".forecast-item");
    selected.style.backgroundColor = "rgba(102, 126, 234, 0.15)";
    selected.style.borderLeft = "10px solid #78cee4ff";
  }
}

// ==========================================
// INITIALIZE APP
// ==========================================
function initApp() {
  populateCityDatalist();
  loadLastCity();
  loadTheme();
  startClock();

  const searchBtn = document.getElementById("searchButton");
  const input = document.getElementById("citySearch");

  searchBtn.addEventListener("click", searchCity);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchCity();
  });
}

document.addEventListener("DOMContentLoaded", initApp);
