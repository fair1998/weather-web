// ==========================================
// Weather Display Functions
// ==========================================

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

function displayAirConditions(data) {
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
