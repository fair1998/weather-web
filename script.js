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

  // Display pre-generated hourly forecast
  displayHourlyForecast(data.hourlyForecast);

  // Display pre-generated 7-day forecast
  display7DayForecast(data.forecast7Days);

  // Save to localStorage
  if (cityKey) {
    updateWeatherBackground(data.condition);
    localStorage.setItem("weatherAppLastCity", cityKey);
  }
}

function displayHourlyForecast(hourlyData) {
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

function display7DayForecast(forecastData) {
  const container = document.getElementById("forecast7Day");

  container.innerHTML = forecastData
    .map(
      (day, index) => `
    <div
      class="forecast-item d-flex align-items-center justify-content-between py-3 border-bottom"
      onclick="updateAirConditions(${index}, event)"
      data-weather='${JSON.stringify(day.weatherData)}'
      data-hourly='${JSON.stringify(day.hourlyForecast)}'
      data-temp-high="${day.tempHigh}"
      data-temp-low="${day.tempLow}"
      data-condition-name="${day.conditionType}"
      data-icon="${day.icon}"
      data-rain-chance="${day.rainChance}"
    >
      <span class="day fw-medium" style="width: 60px">${day.day}</span>
      <i class="bi ${day.icon} fs-4 text-warning" style="width: 40px"></i>
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
function updateAirConditions(dayIndex, event) {
  const forecastItems = document.querySelectorAll(".forecast-item");
  const selectedItem = forecastItems[dayIndex];

  if (!selectedItem) {
    showToast("ไม่พบข้อมูลสำหรับวันที่เลือก");
    return;
  }

  // Get weather data from data attribute
  const weatherData = JSON.parse(selectedItem.getAttribute("data-weather"));
  const hourlyData = JSON.parse(selectedItem.getAttribute("data-hourly"));
  const tempHigh = selectedItem.getAttribute("data-temp-high");
  const icon = selectedItem.getAttribute("data-icon");
  const rainChance = selectedItem.getAttribute("data-rain-chance");

  if (!weatherData) {
    showToast("ไม่พบข้อมูลสภาพอากาศ");
    return;
  }

  // Update Current Weather Card
  document.getElementById("temperature").textContent = tempHigh;
  document.getElementById("rainChance").textContent = `โอกาสเกิดฝน: ${rainChance}`;
  document.getElementById("weatherIcon").className = `bi ${icon} text-warning`;

  // Update using the same rendering function
  const tempData = {
    realFeel: weatherData.realFeel,
    windSpeed: weatherData.windSpeed,
    humidity: weatherData.humidity,
    pm25: weatherData.pm25,
    pressure: weatherData.pressure,
    visibility: weatherData.visibility,
    rainChance: weatherData.rainChance || "N/A",
    uvIndex: weatherData.uvIndex,
  };

  renderAirConditions(tempData);

  // Update Hourly Forecast with pre-generated data
  if (hourlyData) {
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

  // Update selected day highlight
  forecastItems.forEach((item) => {
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
