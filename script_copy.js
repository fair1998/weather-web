// // ==========================================
// // Mock Weather Data (Enhanced)
// // ==========================================
// const mockWeatherData = {
//   london: {
//     city: "London",
//     temperature: 12,
//     condition: "cloudy",
//     humidity: 78,
//     windSpeed: 15,
//     visibility: 8,
//     icon: "bi-cloud",
//     realFeel: 10,
//     rainChance: 45,
//     uvIndex: 2,
//   },
//   paris: {
//     city: "Paris",
//     temperature: 15,
//     condition: "sunny",
//     humidity: 65,
//     windSpeed: 10,
//     visibility: 10,
//     icon: "bi-sun",
//     realFeel: 14,
//     rainChance: 10,
//     uvIndex: 5,
//   },
//   "new york": {
//     city: "New York",
//     temperature: 8,
//     condition: "rainy",
//     humidity: 85,
//     windSpeed: 20,
//     visibility: 5,
//     icon: "bi-cloud-rain",
//     realFeel: 5,
//     rainChance: 80,
//     uvIndex: 1,
//   },
//   tokyo: {
//     city: "Tokyo",
//     temperature: 18,
//     condition: "partly cloudy",
//     humidity: 70,
//     windSpeed: 12,
//     visibility: 9,
//     icon: "bi-cloud-sun",
//     realFeel: 17,
//     rainChance: 30,
//     uvIndex: 4,
//   },
//   sydney: {
//     city: "Sydney",
//     temperature: 22,
//     condition: "sunny",
//     humidity: 60,
//     windSpeed: 8,
//     visibility: 10,
//     icon: "bi-sun",
//     realFeel: 21,
//     rainChance: 5,
//     uvIndex: 7,
//   },
//   dubai: {
//     city: "Dubai",
//     temperature: 35,
//     condition: "sunny",
//     humidity: 45,
//     windSpeed: 5,
//     visibility: 10,
//     icon: "bi-brightness-high",
//     realFeel: 38,
//     rainChance: 0,
//     uvIndex: 10,
//   },
//   moscow: {
//     city: "Moscow",
//     temperature: -5,
//     condition: "snowy",
//     humidity: 90,
//     windSpeed: 25,
//     visibility: 3,
//     icon: "bi-snow",
//     realFeel: -10,
//     rainChance: 70,
//     uvIndex: 1,
//   },
//   singapore: {
//     city: "Singapore",
//     temperature: 28,
//     condition: "partly cloudy",
//     humidity: 80,
//     windSpeed: 10,
//     visibility: 8,
//     icon: "bi-cloud-sun",
//     realFeel: 30,
//     rainChance: 40,
//     uvIndex: 8,
//   },
//   "los angeles": {
//     city: "Los Angeles",
//     temperature: 24,
//     condition: "sunny",
//     humidity: 55,
//     windSpeed: 7,
//     visibility: 10,
//     icon: "bi-sun",
//     realFeel: 23,
//     rainChance: 5,
//     uvIndex: 6,
//   },
//   mumbai: {
//     city: "Mumbai",
//     temperature: 30,
//     condition: "humid and cloudy",
//     humidity: 88,
//     windSpeed: 15,
//     visibility: 7,
//     icon: "bi-cloud-haze",
//     realFeel: 34,
//     rainChance: 60,
//     uvIndex: 5,
//   },
//   berlin: {
//     city: "Berlin",
//     temperature: 10,
//     condition: "cloudy",
//     humidity: 75,
//     windSpeed: 18,
//     visibility: 6,
//     icon: "bi-cloud",
//     realFeel: 8,
//     rainChance: 35,
//     uvIndex: 2,
//   },
//   toronto: {
//     city: "Toronto",
//     temperature: 5,
//     condition: "rainy",
//     humidity: 82,
//     windSpeed: 22,
//     visibility: 4,
//     icon: "bi-cloud-rain",
//     realFeel: 2,
//     rainChance: 75,
//     uvIndex: 1,
//   },
//   madrid: {
//     city: "Madrid",
//     temperature: 31,
//     condition: "sunny",
//     humidity: 35,
//     windSpeed: 2,
//     visibility: 10,
//     icon: "bi-sun",
//     realFeel: 30,
//     rainChance: 0,
//     uvIndex: 9,
//   },
// };

// // ==========================================
// // Generate Hourly Forecast
// // ==========================================
// function generateHourlyForecast(baseData) {
//   const hours = [
//     "6:00 AM",
//     "9:00 AM",
//     "12:00 PM",
//     "3:00 PM",
//     "6:00 PM",
//     "9:00 PM",
//   ];
//   const icons = [
//     "bi-cloud",
//     "bi-cloud-sun",
//     "bi-sun",
//     "bi-sun",
//     "bi-cloud-sun",
//     "bi-cloud",
//   ];

//   return hours.map((hour, index) => {
//     const tempVariation = Math.floor(Math.random() * 6) - 3;
//     return {
//       time: hour,
//       temp: baseData.temperature + tempVariation,
//       icon: icons[index],
//     };
//   });
// }

// // ==========================================
// // Generate 7-Day Forecast
// // ==========================================
// function generate7DayForecast(baseData) {
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const conditions = [
//     { name: "Sunny", icon: "bi-sun" },
//     { name: "Partly cloudy", icon: "bi-cloud-sun" },
//     { name: "Cloudy", icon: "bi-cloud" },
//     { name: "Rainy", icon: "bi-cloud-rain" },
//     { name: "Storm", icon: "bi-cloud-lightning" },
//   ];

//   const forecast = [];
//   const today = new Date();

//   for (let i = 0; i < 7; i++) {
//     const forecastDate = new Date(today);
//     forecastDate.setDate(today.getDate() + i);

//     const dayName =
//       i === 0 ? "Today" : i === 1 ? "Tue" : days[forecastDate.getDay()];

//     // Generate temperature variations
//     const tempHigh = baseData.temperature + Math.floor(Math.random() * 6) - 2;
//     const tempLow = tempHigh - Math.floor(Math.random() * 5) - 3;

//     // Select weather condition
//     const condition = conditions[Math.floor(Math.random() * conditions.length)];

//     forecast.push({
//       day: dayName,
//       tempHigh: tempHigh,
//       tempLow: tempLow,
//       condition: condition.name,
//       icon: condition.icon,
//     });
//   }

//   return forecast;
// }

// // ==========================================
// // Theme Management
// // ==========================================
// const themeToggle = document.getElementById("themeToggle");
// const html = document.documentElement;

// function loadTheme() {
//   const savedTheme = localStorage.getItem("weatherAppTheme") || "dark";
//   applyTheme(savedTheme);
// }

// function applyTheme(theme) {
//   html.setAttribute("data-theme", theme);
//   const icon = themeToggle.querySelector("i");

//   if (theme === "dark") {
//     icon.className = "bi bi-sun";
//   } else {
//     icon.className = "bi bi-moon-stars";
//   }
// }

// themeToggle.addEventListener("click", () => {
//   const currentTheme = html.getAttribute("data-theme") || "dark";
//   const newTheme = currentTheme === "light" ? "dark" : "light";

//   applyTheme(newTheme);
//   localStorage.setItem("weatherAppTheme", newTheme);
// });

// // ==========================================
// // Weather Display Functions
// // ==========================================
// const citySearchInput = document.getElementById("citySearch");
// const welcomeMessage = document.getElementById("welcomeMessage");
// const weatherDashboard = document.getElementById("weatherDashboard");

// function displayWeather(data, cityKey) {
//   // Update main weather info
//   document.getElementById("cityName").textContent = data.city;
//   document.getElementById(
//     "rainChance"
//   ).textContent = `Chance of rain: ${data.rainChance}%`;
//   document.getElementById("temperature").textContent = data.temperature;

//   const weatherIcon = document.getElementById("weatherIcon");
//   weatherIcon.className = `bi ${data.icon}`;

//   // Update air conditions
//   document.getElementById("realFeel").textContent = `${data.realFeel}°`;
//   document.getElementById("windSpeed").textContent = `${data.windSpeed} km/h`;
//   document.getElementById("rainPercent").textContent = `${data.rainChance}%`;
//   document.getElementById("uvIndex").textContent = data.uvIndex;

//   // Generate and display hourly forecast
//   displayHourlyForecast(data);

//   // Generate and display 7-day forecast
//   display7DayForecast(data);

//   // Save to localStorage
//   if (cityKey) {
//     localStorage.setItem("weatherAppLastCity", cityKey);
//   }

//   // Hide welcome, show dashboard
//   welcomeMessage.style.display = "none";
//   weatherDashboard.classList.remove("d-none");
// }

// function displayHourlyForecast(baseData) {
//   const hourlyData = generateHourlyForecast(baseData);
//   const container = document.getElementById("hourlyForecast");

//   container.innerHTML = hourlyData
//     .map(
//       (hour) => `
//     <div class="col text-center">
//       <p class="text-secondary small mb-2">${hour.time}</p>
//       <i class="bi ${hour.icon} fs-2 text-warning d-block my-2"></i>
//       <p class="fw-semibold mb-0">${hour.temp}°</p>
//     </div>
//   `
//     )
//     .join("");
// }

// function display7DayForecast(baseData) {
//   const forecastData = generate7DayForecast(baseData);
//   const container = document.getElementById("forecast7Day");

//   container.innerHTML = forecastData
//     .map(
//       (day) => `
//     <div class="d-flex align-items-center justify-content-between py-3 border-bottom">
//       <span class="fw-medium" style="min-width: 70px;">${day.day}</span>
//       <div class="d-flex align-items-center gap-2 flex-fill justify-content-center">
//         <i class="bi ${day.icon} fs-4 text-warning"></i>
//         <span class="text-secondary small text-capitalize">${day.condition}</span>
//       </div>
//       <div class="d-flex align-items-center gap-2" style="min-width: 80px; justify-content: flex-end;">
//         <span class="fw-semibold">${day.tempHigh}°</span>
//         <span class="text-secondary">/${day.tempLow}°</span>
//       </div>
//     </div>
//   `
//     )
//     .join("");
// }

// function showError(message) {
//   welcomeMessage.innerHTML = `
//     <i class="bi bi-exclamation-circle display-1 text-danger mb-3"></i>
//     <p class="fs-5 text-secondary">${message}</p>
//   `;
//   welcomeMessage.style.display = "block";
//   weatherDashboard.classList.add("d-none");
// }

// // ==========================================
// // Toast Notification
// // ==========================================
// function showToast(message) {
//   const toastElement = document.getElementById("errorToast");
//   const toastMessageElement = document.getElementById("toastMessage");

//   // Set the message
//   toastMessageElement.textContent = message;

//   // Initialize and show the toast
//   const toast = new bootstrap.Toast(toastElement, {
//     autohide: true,
//     delay: 3000,
//   });

//   toast.show();
// }

// // ==========================================
// // Search Functionality
// // ==========================================
// function searchWeather() {
//   const cityInput = citySearchInput.value.trim();

//   if (!cityInput) {
//     showToast("Please enter a city name");
//     return;
//   }

//   // Try to find the city by matching the display name or key
//   let foundCity = null;
//   let foundKey = null;

//   // First, try exact match with city name (case insensitive)
//   for (const [key, data] of Object.entries(mockWeatherData)) {
//     if (data.city.toLowerCase() === cityInput.toLowerCase()) {
//       foundCity = data;
//       foundKey = key;
//       break;
//     }
//   }

//   // If not found, try matching the key directly
//   if (!foundCity) {
//     const lowerInput = cityInput.toLowerCase();
//     if (mockWeatherData[lowerInput]) {
//       foundCity = mockWeatherData[lowerInput];
//       foundKey = lowerInput;
//     }
//   }

//   if (foundCity) {
//     displayWeather(foundCity, foundKey);
//     citySearchInput.value = ""; // Clear input after successful search
//   } else {
//     showToast(`City "${cityInput}" not found. Please select from the list.`);
//   }
// }

// // Event listeners for search
// const searchButton = document.getElementById("searchButton");

// searchButton.addEventListener("click", searchWeather);

// citySearchInput.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     searchWeather();
//   }
// });

// // ==========================================
// // Load Last Viewed City
// // ==========================================
// function loadLastCity() {
//   const lastCity = localStorage.getItem("weatherAppLastCity") || "london";

//   if (mockWeatherData[lastCity]) {
//     displayWeather(mockWeatherData[lastCity], lastCity);
//   }
// }

// // ==========================================
// // Populate City Datalist
// // ==========================================
// function populateCityDatalist() {
//   const datalist = document.getElementById("citiesList");

//   // Get all city names from mockWeatherData
//   Object.entries(mockWeatherData).forEach(([key, value]) => {
//     const option = document.createElement("option");
//     option.value = value.city;
//     option.setAttribute("data-city-key", key);
//     datalist.appendChild(option);
//   });
// }

// // ==========================================
// // Initialize App
// // ==========================================
// document.addEventListener("DOMContentLoaded", () => {
//   loadTheme();

//   // Populate the city datalist with available cities
//   populateCityDatalist();

//   // Load last viewed city or default to London
//   loadLastCity();
// });
