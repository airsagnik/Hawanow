async function fetchCurrentWeather(lat, lon) {
  try {
    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    return extractWeatherInfo(data);
  }
  catch (error) {
    console.log("error fetching data");
  }

}

async function getLocationImage(name) {
  try {
     const apiKey = process.env.LOCATION_IMAGE_API_KEY;
    const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=${apiKey}`);
    const data = await response.json();
    console.log("location url");
    console.log(data["results"][0].urls.regular);
    return data["results"][0].urls.regular;

  }
  catch (error) {
    console.log("error fetching location image");
  }

}

function getCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return timeString;
}

const toLocalTime = (unixTs, tzSec) => {
  // Calculate UTC + timezone
  const dt = new Date((unixTs + tzSec) * 1000);
  return dt.toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', timeZone: "UTC" });
};

async function saveLocationInfoInStorage(data) {
  const storedData = localStorage.getItem("savedLocations");
  let parsedStoredData = [];

  try {
    parsedStoredData = JSON.parse(storedData);
  } catch {
    parsedStoredData = [];
  }

  if (parsedStoredData === null) {
    parsedStoredData = [];
  }

  const key = data.place.trim().toLowerCase();

  // Check if it's an array of objects and contains the key
  const hasKey = Array.isArray(parsedStoredData) &&
    parsedStoredData.every(item => item && typeof item === "object") &&
    parsedStoredData.some(item => key in item);

  console.log("check array while saving");
  console.log(parsedStoredData);
  console.log(Array.isArray(parsedStoredData))

  if (!hasKey) {
    // Add new entry
    parsedStoredData.push({ [key]: data });
    // Save back to localStorage
    localStorage.setItem("savedLocations", JSON.stringify(parsedStoredData));
  }


}

export async function getSavedLocationFromStorage() {
  let parsedStoredData = [];

  const storedData = localStorage.getItem("savedLocations");

  try {
    parsedStoredData = JSON.parse(storedData);
  } catch {
    return [];
  }

  parsedStoredData = parsedStoredData.map(data => {
    let extractedValue = {};
    Object.keys(data).forEach((key) => {
      extractedValue = data[key];
    });
    return extractedValue;
  });

  console.log("data extracted from local storage");
  console.log(parsedStoredData);

  return parsedStoredData;


}

async function extractWeatherInfo(data) {
  const place = data.name;
  const weather = data.weather?.[0] || {};
  const sys = data.sys || {};
  const main = data.main || {};
  const wind = data.wind || {};
  const coord = data.coord || {};


  const lat = coord.lat;
  const lon = coord.lon;
  const sunrise = toLocalTime(sys.sunrise, data.timezone);
  const sunset = toLocalTime(sys.sunset, data.timezone);

  const locationUrl = await getLocationImage(place);
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  saveLocationInfoInStorage({ place: place, locationUrl: locationUrl, lat: lat, lon: lon });



  return {
    place,
    description: weather.description,
    icon: weather.icon,
    iconUrl: iconUrl,
    temperature: main.temp,
    locationUrl,
    sunrise,
    sunset,
    currentTime: getCurrentTime(),
    windSpeed: wind.speed,
    humidity: main.humidity,
    rain: (data.rain?.["1h"] ?? data.rain?.["3h"] ?? 0),
  };
}


export default fetchCurrentWeather;

