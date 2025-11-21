// ==========================================
// Mock Weather Data (Enhanced)
// ==========================================
function generateMockWeatherData() {
  const cities = [
    { key: "bangkok", name: "กรุงเทพมหานคร", baseTemp: 33 },
    { key: "chiangmai", name: "เชียงใหม่", baseTemp: 28 },
    { key: "phuket", name: "ภูเก็ต", baseTemp: 31 },
    { key: "khonkaen", name: "ขอนแก่น", baseTemp: 32 },
    { key: "nakhonratchasima", name: "นครราชสีมา", baseTemp: 31 },
    { key: "chonburi", name: "ชลบุรี", baseTemp: 30 },
    { key: "songkhla", name: "สงขลา", baseTemp: 33 },
    { key: "nakhonsithammarat", name: "นครศรีธรรมราช", baseTemp: 32 },
    { key: "suratthani", name: "สุราษฎร์ธานี", baseTemp: 31 },
    { key: "udonthani", name: "อุดรธานี", baseTemp: 29 },
    { key: "phitsanulok", name: "พิษณุโลก", baseTemp: 30 },
    { key: "nakhonsawan", name: "นครสวรรค์", baseTemp: 32 },
    { key: "rayong", name: "ระยอง", baseTemp: 31 },
    { key: "trang", name: "ตรัง", baseTemp: 30 },
    { key: "maeHongSon", name: "แม่ฮ่องสอน", baseTemp: 27 },
  ];

  const conditions = [
    { name: "sunny", icon: "bi-sun-fill" },
    { name: "sunny", icon: "bi-cloud-sun-fill" },
    { name: "cloudy", icon: "bi-cloud-fill" },
    { name: "rainy", icon: "bi-cloud-rain-fill" },
    { name: "rainy", icon: "bi-cloud-lightning-rain-fill" },
  ];

  const weatherData = {};

  cities.forEach((city) => {
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const rainChance = Math.floor(Math.random() * 101); // 0-100
    const realFeelDiff = Math.floor(Math.random() * 5); // 0-4
    const windSpeed = Math.floor(Math.random() * 11) + 8; // 8-18 km/h
    const uvIndex = Math.floor(Math.random() * 6) + 4; // 4-9
    const humidity = Math.floor(Math.random() * 40) + 50; // 50-89%
    const pm25 = Math.floor(Math.random() * 80) + 20; // 20-99
    const pressure = Math.floor(Math.random() * 15) + 1005; // 1005-1019 hPa
    const visibility = Math.floor(Math.random() * 6) + 5; // 5-10 km

    // Generate 7-day forecast for this city
    const forecast7Days = generate7DayForecastData(city.baseTemp);

    // Generate hourly forecast for today (using city's current data)
    const hourlyForecast = generateHourlyForecastData({
      temperature: city.baseTemp,
      condition: condition.name,
    });

    weatherData[city.key] = {
      city: city.name,
      temperature: city.baseTemp,
      rainChance: `${rainChance}%`,
      icon: condition.icon,
      condition: condition.name,
      realFeel: `${city.baseTemp + realFeelDiff}°`,
      windSpeed: windSpeed,
      uvIndex: uvIndex,
      humidity: humidity,
      pm25: pm25,
      pressure: pressure,
      visibility: visibility,
      // Pre-generated forecasts
      hourlyForecast: hourlyForecast,
      forecast7Days: forecast7Days,
    };
  });

  return weatherData;
}

const mockWeatherData = generateMockWeatherData();

// ==========================================
// Generate Hourly Forecast Data
// ==========================================
function generateHourlyForecastData(baseData) {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 24;
    return hour.toString().padStart(2, "0") + ":00";
  });

  // Map icons based on condition
  const getIconForCondition = (condition) => {
    if (condition === "sunny") return ["bi-sun", "bi-sun", "bi-cloud-sun"];
    if (condition === "cloudy") return ["bi-cloud", "bi-cloud-sun", "bi-cloud"];
    if (condition === "rainy") return ["bi-cloud-rain", "bi-cloud-drizzle", "bi-cloud-rain"];
    return ["bi-cloud-sun", "bi-sun", "bi-cloud"];
  };

  const conditionIcons = getIconForCondition(baseData.condition);

  return hours.map((hour, index) => {
    const hourNum = parseInt(hour);

    // Temperature varies throughout the day (cooler at night, warmer in afternoon)
    let tempVariation = 0;
    if (hourNum >= 0 && hourNum < 6) {
      tempVariation = Math.floor(Math.random() * 3) - 5; // -5 to -3 (cooler at night)
    } else if (hourNum >= 6 && hourNum < 12) {
      tempVariation = Math.floor(Math.random() * 3) - 2; // -2 to 0 (morning)
    } else if (hourNum >= 12 && hourNum < 18) {
      tempVariation = Math.floor(Math.random() * 4); // 0 to +3 (hottest in afternoon)
    } else {
      tempVariation = Math.floor(Math.random() * 3) - 3; // -3 to -1 (evening)
    }

    const iconIndex = Math.floor(Math.random() * conditionIcons.length);

    return {
      time: hour,
      temp: baseData.temperature + tempVariation,
      icon: conditionIcons[iconIndex],
    };
  });
}

// ==========================================
// Generate 7-Day Forecast Data
// ==========================================
function generate7DayForecastData(baseTemp) {
  const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"];
  const conditions = [
    { name: "มีเเดดออก", icon: "bi-sun", condition: "sunny" },
    { name: "มีเมฆบางส่วน", icon: "bi-cloud-sun", condition: "cloudy" },
    { name: "มีเมฆมาก", icon: "bi-cloud", condition: "cloudy" },
    { name: "ฝนตก", icon: "bi-cloud-rain", condition: "rainy" },
    { name: "มีพายุ", icon: "bi-cloud-lightning", condition: "rainy" },
  ];

  const forecast = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + i);

    const dayName = i === 0 ? "วันนี้" : days[forecastDate.getDay()];
    const dayKey = days[forecastDate.getDay()];

    // Generate temperature variations based on baseTemp
    const tempVariation = Math.floor(Math.random() * 8) - 4; // -4 to +3
    const tempHigh = baseTemp + tempVariation;
    const tempLow = tempHigh - Math.floor(Math.random() * 6) - 3; // 3-8 degrees lower

    // Select weather condition
    const selectedCondition = conditions[Math.floor(Math.random() * conditions.length)];

    // Generate varied data for each day
    const rainChanceNum = Math.floor(Math.random() * 101); // 0-100
    const realFeelVariation = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const realFeelTemp = tempHigh + realFeelVariation;
    const windVariation = Math.floor(Math.random() * 15) + 5; // 5-19 km/h
    const humidityVariation = Math.floor(Math.random() * 40) + 50; // 50-89%
    const pm25Variation = Math.floor(Math.random() * 80) + 20; // 20-99
    const pressureVariation = Math.floor(Math.random() * 15) + 1005; // 1005-1019 hPa
    const visibilityVariation = Math.floor(Math.random() * 6) + 5; // 5-10 km
    const uvVariation = Math.floor(Math.random() * 9) + 1; // 1-9

    // Generate hourly forecast for this specific day
    const hourlyForecastData = generateHourlyForecastData({
      temperature: tempHigh,
      condition: selectedCondition.condition,
    });

    forecast.push({
      key: dayKey,
      day: dayName,
      tempHigh: tempHigh,
      tempLow: tempLow,
      rainChance: `${rainChanceNum}%`,
      condition: selectedCondition.name,
      conditionType: selectedCondition.condition,
      icon: selectedCondition.icon,
      // Store hourly forecast data for this day
      hourlyForecast: hourlyForecastData,
      // Store complete weather data for this day with variations
      weatherData: {
        realFeel: `${realFeelTemp}°`,
        windSpeed: windVariation,
        humidity: humidityVariation,
        pm25: pm25Variation,
        pressure: pressureVariation,
        visibility: visibilityVariation,
        uvIndex: uvVariation,
        rainChance: `${rainChanceNum}%`,
      },
    });
  }

  return forecast;
}
