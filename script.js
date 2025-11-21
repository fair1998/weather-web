// ==========================================
// Main Weather Display
// ==========================================
function displayWeather(data, cityKey) {
  // Update main weather info
  const cityNameElement = document.getElementById("cityName");
  cityNameElement.textContent = data.city;

  document.getElementById("rainChance").textContent = `โอกาสเกิดฝน: ${data.rainChance}`;
  document.getElementById("temperature").textContent = data.temperature;
  document.getElementById("weatherIcon").className = `bi ${data.icon} text-warning`;

  // Display air conditions
  displayAirConditions(data);

  // Display pre-generated hourly forecast
  displayHourlyForecast(data.hourlyForecast);

  // Display pre-generated 7-day forecast
  display7DayForecast(data.forecast7Days);

  // Save to localStorage
  if (cityKey) {
    updateWeatherBackground(data.condition);
    localStorage.setItem("weatherAppLastCity", cityKey);
  }

  // Update favorite button state
  if (typeof updateFavoriteButton === "function") {
    updateFavoriteButton();
  }
}

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
// WEATHER BACKGROUND (รวม version เดียว)
// ==========================================
function updateWeatherBackground(condition) {
  const weatherCard = document.querySelector(".weather-card");
  weatherCard.classList.remove("sunny-bg", "cloudy-bg", "rainy-bg");

  if (condition === "sunny") weatherCard.classList.add("sunny-bg");
  else if (condition === "cloudy") weatherCard.classList.add("cloudy-bg");
  else if (condition === "rainy") weatherCard.classList.add("rainy-bg");
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
  const conditionType = selectedItem.getAttribute("data-condition-name");

  if (!weatherData) {
    showToast("ไม่พบข้อมูลสภาพอากาศ");
    return;
  }

  // Update weather background based on selected day's condition
  if (conditionType) {
    updateWeatherBackground(conditionType);
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

  displayAirConditions(tempData);

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
