// ==========================================
// Mock Weather Data (Enhanced)
// ==========================================
const mockWeatherData = {
  bangkok: {
    city: "กรุงเทพมหานคร",
    temperature: 33,
    rainChance: "40%",
    icon: "bi-cloud-sun-fill",
    condition: "sunny",
    realFeel: "35°",
    windSpeed: 15,
    uvIndex: 8,
    humidity: 75,
    pm25: 68,
    pressure: 1010,
    visibility: 8,
  },
  chiangmai: {
    city: "เชียงใหม่",
    temperature: 28,
    rainChance: "30%",
    icon: "bi-sun-fill",
    condition: "sunny",
    realFeel: "30°",
    windSpeed: 10,
    uvIndex: 7,
    humidity: 65,
    pm25: 85,
    pressure: 1012,
    visibility: 9,
  },
  phuket: {
    city: "ภูเก็ต",
    temperature: 31,
    rainChance: "60%",
    icon: "bi-cloud-rain-fill",
    condition: "rainy",
    realFeel: "33°",
    windSpeed: 12,
    uvIndex: 6,
    humidity: 85,
    pm25: 25,
    pressure: 1008,
    visibility: 7,
  },
  khonkaen: {
    city: "ขอนแก่น",
    temperature: 32,
    rainChance: "25%",
    icon: "bi-sun-fill",
    condition: "sunny",
    realFeel: "34°",
    windSpeed: 14,
    uvIndex: 7,
    humidity: 60,
    pm25: 55,
    pressure: 1011,
    visibility: 10,
  },
  nakhonratchasima: {
    city: "นครราชสีมา",
    temperature: 31,
    rainChance: "35%",
    icon: "bi-cloud-fill",
    condition: "cloudy",
    realFeel: "33°",
    windSpeed: 13,
    uvIndex: 7,
    humidity: 68,
    pm25: 48,
    pressure: 1012,
    visibility: 9,
  },
  chonburi: {
    city: "ชลบุรี",
    temperature: 30,
    rainChance: "45%",
    icon: "bi-cloud-rain-fill",
    condition: "rainy",
    realFeel: "32°",
    windSpeed: 14,
    uvIndex: 7,
    humidity: 78,
    pm25: 42,
    pressure: 1009,
    visibility: 8,
  },
  songkhla: {
    city: "สงขลา",
    temperature: 33,
    rainChance: "55%",
    icon: "bi-cloud-rain-fill",
    condition: "rainy",
    realFeel: "34°",
    windSpeed: 15,
    uvIndex: 8,
    humidity: 82,
    pm25: 30,
    pressure: 1008,
    visibility: 7,
  },
  nakhonsithammarat: {
    city: "นครศรีธรรมราช",
    temperature: 32,
    rainChance: "70%",
    icon: "bi-cloud-lightning-rain-fill",
    condition: "rainy",
    realFeel: "33°",
    windSpeed: 14,
    uvIndex: 7,
    humidity: 88,
    pm25: 28,
    pressure: 1007,
    visibility: 6,
  },
  suratthani: {
    city: "สุราษฎร์ธานี",
    temperature: 31,
    rainChance: "50%",
    icon: "bi-cloud-rain-fill",
    condition: "rainy",
    realFeel: "32°",
    windSpeed: 14,
    uvIndex: 7,
    humidity: 80,
    pm25: 32,
    pressure: 1009,
    visibility: 8,
  },
  udonthani: {
    city: "อุดรธานี",
    temperature: 29,
    rainChance: "20%",
    icon: "bi-sun-fill",
    condition: "sunny",
    realFeel: "29°",
    windSpeed: 9,
    uvIndex: 6,
    humidity: 58,
    pm25: 62,
    pressure: 1013,
    visibility: 10,
  },
  phitsanulok: {
    city: "พิษณุโลก",
    temperature: 30,
    rainChance: "25%",
    icon: "bi-sun-fill",
    condition: "sunny",
    realFeel: "31°",
    windSpeed: 11,
    uvIndex: 7,
    humidity: 62,
    pm25: 58,
    pressure: 1012,
    visibility: 9,
  },
  nakhonsawan: {
    city: "นครสวรรค์",
    temperature: 32,
    rainChance: "35%",
    icon: "bi-cloud-fill",
    condition: "cloudy",
    realFeel: "33°",
    windSpeed: 13,
    uvIndex: 7,
    humidity: 70,
    pm25: 52,
    pressure: 1011,
    visibility: 8,
  },
  rayong: {
    city: "ระยอง",
    temperature: 31,
    rainChance: "45%",
    icon: "bi-cloud-rain-fill",
    condition: "rainy",
    realFeel: "32°",
    windSpeed: 14,
    uvIndex: 7,
    humidity: 76,
    pm25: 45,
    pressure: 1010,
    visibility: 8,
  },
  trang: {
    city: "ตรัง",
    temperature: 30,
    rainChance: "60%",
    icon: "bi-cloud-rain-fill",
    condition: "rainy",
    realFeel: "31°",
    windSpeed: 11,
    uvIndex: 7,
    humidity: 84,
    pm25: 26,
    pressure: 1008,
    visibility: 7,
  },
  maeHongSon: {
    city: "แม่ฮ่องสอน",
    temperature: 27,
    rainChance: "15%",
    icon: "bi-sun-fill",
    condition: "sunny",
    realFeel: "27°",
    windSpeed: 8,
    uvIndex: 5,
    humidity: 55,
    pm25: 92,
    pressure: 1014,
    visibility: 10,
  },
};

// ==========================================
// Generate Hourly Forecast
// ==========================================
function generateHourlyForecast(baseData) {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 24;
    return hour.toString().padStart(2, "0") + ":00";
  });
  const icons = ["bi-cloud", "bi-cloud-sun", "bi-sun", "bi-sun", "bi-cloud-sun", "bi-cloud"];

  return hours.map((hour, index) => {
    const tempVariation = Math.floor(Math.random() * 6) - 3;
    const iconIndex = Math.floor(Math.random() * 6);
    return {
      time: hour,
      temp: baseData.temperature + tempVariation,
      icon: icons[iconIndex],
    };
  });
}

// ==========================================
// Generate 7-Day Forecast
// ==========================================
function generate7DayForecast(baseData) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const conditions = [
    { name: "มีเเดดออก", icon: "bi-sun" },
    { name: "มีเมฆบางส่วน", icon: "bi-cloud-sun" },
    { name: "มีเมฆมาก", icon: "bi-cloud" },
    { name: "ฝนตก", icon: "bi-cloud-rain" },
    { name: "มีพายุ", icon: "bi-cloud-lightning" },
  ];

  const forecast = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + i);

    const dayName = i === 0 ? "Today" : days[forecastDate.getDay()];

    // Generate temperature variations
    const tempHigh = baseData.temperature + Math.floor(Math.random() * 6) - 2;
    const tempLow = tempHigh - Math.floor(Math.random() * 5) - 3;

    // Select weather condition
    const condition = conditions[Math.floor(Math.random() * conditions.length)];

    forecast.push({
      key: days[forecastDate.getDay()],
      day: dayName,
      tempHigh: tempHigh,
      tempLow: tempLow,
      rainChance: Math.floor(Math.random() * 101) + "%",
      condition: condition.name,
      icon: condition.icon,
    });
  }

  return forecast;
}

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
// Weather Display Functions
// ==========================================
const citySearchInput = document.getElementById("citySearch");

// Air conditions configuration
const airConditionsConfig = [
  {
    id: "realFeel",
    label: "ความรู้สึกจริง",
    icon: "bi-thermometer-half",
    getValue: (data) => data.realFeel,
  },
  { id: "windSpeed", label: "ลม", icon: "bi-wind", getValue: (data) => `${data.windSpeed} km/h` },
  {
    id: "humidity",
    label: "ความชื้น",
    icon: "bi-droplet",
    getValue: (data) => `${data.humidity}%`,
  },
  { id: "pm25", label: "ค่าฝุ่น PM2.5", icon: "bi-cloud-haze", getValue: (data) => data.pm25 },
  {
    id: "pressure",
    label: "ความกดอากาศ",
    icon: "bi-speedometer",
    getValue: (data) => `${data.pressure} hPa`,
  },
  {
    id: "visibility",
    label: "ระยะมองเห็น",
    icon: "bi-eye",
    getValue: (data) => `${data.visibility} km`,
  },
  {
    id: "rainPercent",
    label: "โอกาสเกิดฝน",
    icon: "bi-moisture",
    getValue: (data) => data.rainChance,
  },
  { id: "uvIndex", label: "ดัชนี UV", icon: "bi-sun", getValue: (data) => data.uvIndex },
];

function renderAirConditions(data) {
  const container = document.getElementById("airConditionsContainer");

  container.innerHTML = airConditionsConfig
    .map(
      (item) => `
    <div class="col">
      <div class="d-flex gap-3">
        <i class="bi ${item.icon} fs-4 text-secondary"></i>
        <div>
          <p class="text-secondary mb-1 small">${item.label}</p>
          <p class="fs-4 fw-semibold mb-0" id="${item.id}">${item.getValue(data)}</p>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function displayWeather(data, cityKey) {
  // Update main weather info
  document.getElementById("cityName").textContent = data.city;
  document.getElementById("rainChance").textContent = `โอกาสเกิดฝน: ${data.rainChance}`;
  document.getElementById("temperature").textContent = data.temperature;
  document.getElementById("weatherIcon").className = `bi ${data.icon} text-warning`;

  // Render air conditions
  renderAirConditions(data);

  // Generate and display hourly forecast
  displayHourlyForecast(data);

  // Generate and display 7-day forecast
  display7DayForecast(data);

  // Save to localStorage
  if (cityKey) {
    updateWeatherBackground(data.condition);
    localStorage.setItem("weatherAppLastCity", cityKey);
  }
}

function displayHourlyForecast(baseData) {
  const hourlyData = generateHourlyForecast(baseData);
  const container = document.getElementById("hourlyForecast");

  container.innerHTML = hourlyData
    .map(
      (hour) => `
    <div class="hourly-item text-center flex-shrink-0">
      <p class="text-secondary small mb-2">${hour.time}</p>
      <i class="bi ${hour.icon} fs-2 text-warning d-block my-2"></i>
      <p class="fw-semibold mb-0">${hour.temp}°</p>
    </div>
  `
    )
    .join("");
}

function display7DayForecast(baseData) {
  const forecastData = generate7DayForecast(baseData);
  const container = document.getElementById("forecast7Day");

  container.innerHTML = forecastData
    .map(
      (day) => `
    <div
      class="forecast-item d-flex align-items-center justify-content-between py-3 border-bottom"
      onclick="updateAirConditions('${day.key}', event)"
    >
      <span class="day fw-medium" style="width: 60px">${day.day}</span>
      <i class="bi bi-cloud-sun fs-4 text-warning" style="width: 40px"></i>
      <span class="text-secondary small text-capitalize flex-fill">
        ${day.condition}
      </span>
      <span
        class="text-secondary fw-semibold"
        style="width: 40px; text-align: right"
      >
        ${day.tempLow}°
      </span>
      <div class="temp-bar flex-fill mx-2">
        <div class="bar-inner" style="width: 60%"></div>
      </div>
      <span class="fw-semibold" style="width: 40px">${day.tempHigh}°</span>
      <div
        class="rain-chance d-flex align-items-center gap-1"
        style="width: 70px; justify-content: flex-end"
      >
        <i class="bi bi-droplet text-info"></i>
        <span class="text-secondary small">${day.rainChance}</span>
      </div>
    </div>
  `
    )
    .join("");
}

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

// ==========================================
// Search Functionality
// ==========================================
function searchWeather() {
  const cityInput = citySearchInput.value.trim();

  if (!cityInput) {
    showToast("Please enter a city name");
    return;
  }

  // Try to find the city by matching the display name or key
  let foundCity = null;
  let foundKey = null;

  // First, try exact match with city name (case insensitive)
  for (const [key, data] of Object.entries(mockWeatherData)) {
    if (data.city.toLowerCase() === cityInput.toLowerCase()) {
      foundCity = data;
      foundKey = key;
      break;
    }
  }

  // If not found, try matching the key directly
  if (!foundCity) {
    const lowerInput = cityInput.toLowerCase();
    if (mockWeatherData[lowerInput]) {
      foundCity = mockWeatherData[lowerInput];
      foundKey = lowerInput;
    }
  }

  if (foundCity) {
    displayWeather(foundCity, foundKey);
    citySearchInput.value = ""; // Clear input after successful search
  } else {
    showToast(`City "${cityInput}" not found. Please select from the list.`);
  }
}

// Event listeners for search
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", searchWeather);

citySearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

// ==========================================
// Load Last Viewed City
// ==========================================
function loadLastCity() {
  const lastCity = localStorage.getItem("weatherAppLastCity") || "bangkok";

  if (mockWeatherData[lastCity]) {
    displayWeather(mockWeatherData[lastCity], lastCity);
  }
}

// ==========================================
// Populate City Datalist
// ==========================================
function populateCityDatalist() {
  const datalist = document.getElementById("citiesList");

  // Get all city names from mockWeatherData
  Object.entries(mockWeatherData).forEach(([key, value]) => {
    const option = document.createElement("option");
    option.value = value.city;
    option.setAttribute("data-city-key", key);
    datalist.appendChild(option);
  });
}

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
// AIR CONDITIONS (ข้อมูลรายวัน)
// ==========================================
const weatherData = {
  Sun: {
    realFeel: "24°",
    wind: "12 km/h",
    humidity: "65%",
    pm25: "45",
    pressure: "1012 hPa",
    visibility: "9 km",
    rainChance: "45%",
    uvIndex: "6",
  },
  Mon: {
    realFeel: "30°",
    wind: "8 km/h",
    humidity: "55%",
    pm25: "38",
    pressure: "1014 hPa",
    visibility: "10 km",
    rainChance: "6%",
    uvIndex: "8",
  },
  Tue: {
    realFeel: "23°",
    wind: "18 km/h",
    humidity: "72%",
    pm25: "52",
    pressure: "1010 hPa",
    visibility: "8 km",
    rainChance: "40%",
    uvIndex: "4",
  },
  Wed: {
    realFeel: "26°",
    wind: "22 km/h",
    humidity: "85%",
    pm25: "35",
    pressure: "1008 hPa",
    visibility: "7 km",
    rainChance: "70%",
    uvIndex: "3",
  },
  Thu: {
    realFeel: "35°",
    wind: "10 km/h",
    humidity: "50%",
    pm25: "68",
    pressure: "1015 hPa",
    visibility: "10 km",
    rainChance: "10%",
    uvIndex: "9",
  },
  Fri: {
    realFeel: "25°",
    wind: "25 km/h",
    humidity: "88%",
    pm25: "30",
    pressure: "1007 hPa",
    visibility: "6 km",
    rainChance: "90%",
    uvIndex: "2",
  },
  Sat: {
    realFeel: "27°",
    wind: "15 km/h",
    humidity: "68%",
    pm25: "48",
    pressure: "1011 hPa",
    visibility: "9 km",
    rainChance: "50%",
    uvIndex: "5",
  },
};

function updateAirConditions(day, event) {
  const data = weatherData[day];
  if (!data) {
    showToast("ไม่พบข้อมูลสำหรับวัน:" + day);
    return;
  }

  // Update using the same rendering function
  const tempData = {
    realFeel: data.realFeel,
    windSpeed: parseInt(data.wind),
    humidity: parseInt(data.humidity),
    pm25: data.pm25,
    pressure: parseInt(data.pressure),
    visibility: parseInt(data.visibility),
    rainChance: data.rainChance,
    uvIndex: data.uvIndex,
  };

  renderAirConditions(tempData);

  // Update selected day highlight
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
// Initialize App
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  startClock();

  // Populate the city datalist with available cities
  populateCityDatalist();

  // Load last viewed city or default to London
  loadLastCity();
});
