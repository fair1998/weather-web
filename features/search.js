// ==========================================
// Search Functionality
// ==========================================
const citySearchInput = document.getElementById("citySearch");

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
