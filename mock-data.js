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
