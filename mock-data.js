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
    };
  });

  return weatherData;
}

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
  const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"];
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

    const dayName = i === 0 ? "วันนี้" : days[forecastDate.getDay()];
    const dayKey = days[forecastDate.getDay()];

    // Generate temperature variations based on baseData
    const tempVariation = Math.floor(Math.random() * 8) - 4; // -4 to +3
    const tempHigh = baseData.temperature + tempVariation;
    const tempLow = tempHigh - Math.floor(Math.random() * 6) - 3; // 3-8 degrees lower

    // Select weather condition
    const condition = conditions[Math.floor(Math.random() * conditions.length)];

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

    forecast.push({
      key: dayKey,
      day: dayName,
      tempHigh: tempHigh,
      tempLow: tempLow,
      rainChance: `${rainChanceNum}%`,
      condition: condition.name,
      icon: condition.icon,
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
