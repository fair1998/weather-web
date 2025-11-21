/**
 * Favorites Management Module
 * Handles adding, removing, and displaying favorite cities
 */

// ==========================================
// Favorite Cities Storage Management
// ==========================================

/**
 * Get all favorite cities from localStorage
 * @returns {Array} Array of favorite city objects
 */
function getFavoriteCities() {
  const favorites = localStorage.getItem("favoriteCities");
  return favorites ? JSON.parse(favorites) : [];
}

/**
 * Save favorite cities to localStorage
 * @param {Array} favorites - Array of favorite city objects
 */
function saveFavoriteCities(favorites) {
  localStorage.setItem("favoriteCities", JSON.stringify(favorites));
}

/**
 * Check if a city is in favorites
 * @param {string} cityName - Name of the city
 * @returns {boolean}
 */
function isCityFavorite(cityName) {
  const favorites = getFavoriteCities();
  return favorites.some((fav) => fav.name.toLowerCase() === cityName.toLowerCase());
}

/**
 * Add a city to favorites
 * @param {Object} cityData - City weather data object
 */
function addToFavorites(cityData) {
  const favorites = getFavoriteCities();

  // Check if already exists
  if (isCityFavorite(cityData.name)) {
    showToast("เมืองนี้อยู่ในรายการโปรดแล้ว", "info");
    return;
  }

  // Create favorite object
  const favoriteCity = {
    name: cityData.name,
    temperature: cityData.temperature,
    condition: cityData.condition,
    icon: cityData.icon,
    humidity: cityData.humidity,
    windSpeed: cityData.windSpeed,
    addedAt: new Date().toISOString(),
  };

  favorites.push(favoriteCity);
  saveFavoriteCities(favorites);

  // Update UI
  updateFavoriteButton();
  renderFavoriteCities();
  showToast("เพิ่มเมืองโปรดสำเร็จ", "success");
}

/**
 * Remove a city from favorites
 * @param {string} cityName - Name of the city to remove
 */
function removeFromFavorites(cityName) {
  let favorites = getFavoriteCities();
  favorites = favorites.filter((fav) => fav.name.toLowerCase() !== cityName.toLowerCase());
  saveFavoriteCities(favorites);

  // Update UI
  updateFavoriteButton();
  renderFavoriteCities();
  showToast("ลบเมืองโปรดสำเร็จ", "success");
}

// ==========================================
// UI Update Functions
// ==========================================

/**
 * Update the favorite button state based on current city
 */
function updateFavoriteButton() {
  const favoriteBtn = document.getElementById("favoriteBtn");
  const cityNameElement = document.getElementById("cityName");

  if (!favoriteBtn || !cityNameElement) return;

  const currentCity = cityNameElement.textContent.trim();
  const isFavorite = isCityFavorite(currentCity);

  if (isFavorite) {
    favoriteBtn.classList.add("active");
    favoriteBtn.innerHTML = '<i class="bi bi-star-fill fs-5"></i>';
    favoriteBtn.setAttribute("aria-label", "Remove from favorites");
  } else {
    favoriteBtn.classList.remove("active");
    favoriteBtn.innerHTML = '<i class="bi bi-star fs-5"></i>';
    favoriteBtn.setAttribute("aria-label", "Add to favorites");
  }
}

/**
 * Render all favorite cities in the favorites section
 */
function renderFavoriteCities() {
  const container = document.getElementById("favoriteCitiesList");
  if (!container) return;

  const favorites = getFavoriteCities();

  if (favorites.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="text-center py-5">
          <i class="bi bi-star"  style="font-size: 4rem; opacity: 0.3;"></i>
          <p class="mt-3">ยังไม่มีเมืองโปรด<br>คลิกปุ่ม <i class="bi bi-star"></i> เพื่อเพิ่มเมืองโปรด</p>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = favorites
    .map(
      (city) => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card border-0 shadow-sm favorite-city-card" onclick="loadCityFromFavorite('${city.name}')">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 class="mb-0 fw-semibold">${city.name}</h5>
            </div>
            <button 
              class="btn btn-sm btn-outline-danger remove-favorite" 
              onclick="event.stopPropagation(); removeFromFavorites('${city.name}')"
              aria-label="Remove from favorites"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="d-flex align-items-start mb-2">
                <span class="h2 fw-light mb-0">${city.temperature}</span>
                <span class="fs-4 fw-light">°C</span>
              </div>
              <p class="text-muted mb-2 small">${city.condition}</p>
              <div class="d-flex gap-3 small text-muted">
                <span><i class="bi bi-droplet"></i> ${city.humidity}</span>
                <span><i class="bi bi-wind"></i> ${city.windSpeed} km/h</span>
              </div>
            </div>
            <div class="weather-mini-icon">
              <i class="${city.icon}"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

/**
 * Load city weather data when clicked from favorites
 * @param {string} cityName - Name of the city to load
 */
function loadCityFromFavorite(cityName) {
  // Load the city data
  const cityInput = document.getElementById("citySearch");
  if (cityInput) {
    cityInput.value = cityName;
    // Trigger search
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
      searchButton.click();
    }
  }

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// Scroll to Section Functions
// ==========================================

/**
 * Scroll to weather section
 */
function scrollToWeatherSection() {
  const weatherDashboard = document.getElementById("weatherDashboard");
  if (weatherDashboard) {
    weatherDashboard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  updateMenuHighlight("weather");
}

/**
 * Scroll to favorites section
 */
function scrollToFavoritesSection() {
  const favoriteDashboard = document.getElementById("favoriteDashboard");
  if (favoriteDashboard) {
    favoriteDashboard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  updateMenuHighlight("favorite");
}

/**
 * Update menu highlight
 */
function updateMenuHighlight(section) {
  const weatherMenuItem = document.getElementById("weatherMenuItem");
  const favoriteMenuItem = document.getElementById("favoriteMenuItem");

  if (section === "weather") {
    if (weatherMenuItem) {
      weatherMenuItem.classList.add("active");
      weatherMenuItem.querySelector("i").classList.remove("text-secondary");
      weatherMenuItem.querySelector("small").classList.remove("text-secondary");
      weatherMenuItem.querySelector("small").classList.add("text-light");
    }
    if (favoriteMenuItem) {
      favoriteMenuItem.classList.remove("active");
      favoriteMenuItem.querySelector("i").classList.add("text-secondary");
      favoriteMenuItem.querySelector("small").classList.add("text-secondary");
      favoriteMenuItem.querySelector("small").classList.remove("text-light");
    }
  } else if (section === "favorite") {
    if (weatherMenuItem) {
      weatherMenuItem.classList.remove("active");
      weatherMenuItem.querySelector("i").classList.add("text-secondary");
      weatherMenuItem.querySelector("small").classList.add("text-secondary");
      weatherMenuItem.querySelector("small").classList.remove("text-light");
    }
    if (favoriteMenuItem) {
      favoriteMenuItem.classList.add("active");
      favoriteMenuItem.querySelector("i").classList.remove("text-secondary");
      favoriteMenuItem.querySelector("small").classList.remove("text-secondary");
      favoriteMenuItem.querySelector("small").classList.add("text-light");
    }
  }
}

// ==========================================
// Event Listeners Setup
// ==========================================

/**
 * Initialize favorites functionality
 */
function initializeFavorites() {
  // Favorite button click handler
  const favoriteBtn = document.getElementById("favoriteBtn");
  if (favoriteBtn) {
    favoriteBtn.addEventListener("click", function () {
      const cityNameElement = document.getElementById("cityName");
      const currentCity = cityNameElement.textContent.trim();

      if (isCityFavorite(currentCity)) {
        removeFromFavorites(currentCity);
      } else {
        // Get current weather data
        const cityData = {
          name: currentCity,
          temperature: document.getElementById("temperature")?.textContent || "0",
          condition: document.getElementById("rainChance")?.textContent || "Unknown",
          icon: document.getElementById("weatherIcon")?.className || "bi bi-cloud",
          humidity: document.querySelector("[data-humidity]")?.textContent || "0",
          windSpeed: document.querySelector("[data-wind]")?.textContent || "0",
        };
        addToFavorites(cityData);
      }
    });
  }

  // Menu item click handlers for scrolling
  const weatherMenuItem = document.getElementById("weatherMenuItem");
  const favoriteMenuItem = document.getElementById("favoriteMenuItem");

  if (weatherMenuItem) {
    weatherMenuItem.addEventListener("click", scrollToWeatherSection);
  }

  if (favoriteMenuItem) {
    favoriteMenuItem.addEventListener("click", scrollToFavoritesSection);
  }

  // Initial render
  renderFavoriteCities();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeFavorites);
} else {
  initializeFavorites();
}
