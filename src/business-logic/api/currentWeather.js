async function fetchCurrentWeather(lat, lon) {
  try {
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const forecastData = await forecastResponse.json();
    console.log(forecastData);
    console.log(data);
    return extractWeatherInfo(data, forecastData);
  }
  catch (error) {
    console.log("error fetching data");
  }

}


async function getLocationImage(name) {
  try {
    const apiKey = process.env.REACT_APP_LOCATION_IMAGE_API_KEY;
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

const fieldConfigs = [
  { id: 'temp', path: 'main.temp', title: 'Temperature', unit: '\u00B0C' },
  { id: 'feels_like', path: 'main.feels_like', title: 'Feels Like', unit: '\u00B0C' },
  { id: 'humidity', path: 'main.humidity', title: 'Humidity', unit: '%' },
  { id: 'pressure', path: 'main.pressure', title: 'Pressure', unit: 'hPa' },
  { id: 'wind_speed', path: 'wind.speed', title: 'Wind Speed', unit: 'm/s' },
  { id: 'wind_gust', path: 'wind.gust', title: 'Gust', unit: 'm/s' },
  { id: 'wind_deg', path: 'wind.deg', title: 'Direction', unit: 'deg' },
  { id: 'visibility', path: 'visibility', title: 'Visibility', unit: 'm' },
  { id: 'cloudiness', path: 'clouds.all', title: 'Cloudiness', unit: '%' },
  { id: 'rain_1h', path: 'rain.1h', title: 'Rain (1 h)', unit: 'mm' },
];


function getNested(obj, path) {
  return path.split('.').reduce((acc, key) =>
    acc && acc[key] !== undefined ? acc[key] : undefined, obj);
}

function mapWeatherData(data) {
  return fieldConfigs
    .map(({ id, path, title, unit }) => {
      const value = getNested(data, path);
      if (value === undefined) return null;
      return { id, value, unit, title };
    })
    .filter(item => item !== null);
}

function prepareForecastDataList(data) {
  return data.map((data) => {
    const timeOfForcastedWeather = data.dt_txt;
    const place = data.name;
    const weather = data.weather?.[0] || {};
    const main = data.main || {};
    const wind = data.wind || {};
    let weatherParams = []
    weatherParams = mapWeatherData(data)
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    const pop = data.pop;

    return {
      place,
      pop: pop,
      time: timeOfForcastedWeather,
      description: weather.description,
      weatherParams: weatherParams,
      icon: weather.icon,
      iconUrl: iconUrl,
      temperature: main.temp,
      currentTime: getCurrentTime(),
      windSpeed: wind.speed,
      humidity: main.humidity,
      rain: (data.rain?.["1h"] ?? data.rain?.["3h"] ?? 0),
    };

  });
}

async function extractWeatherInfo(data, forecastData) {
  const place = data.name;
  const weather = data.weather?.[0] || {};
  const sys = data.sys || {};
  const main = data.main || {};
  const wind = data.wind || {};
  const coord = data.coord || {};
  let weatherParams = []

  const forcastList = forecastData.list;
  const forecastDisplay = prepareForecastDataList(forcastList);
  console.log(forecastDisplay);

  weatherParams = mapWeatherData(data)




  const lat = coord.lat;
  const lon = coord.lon;
  const sunrise = toLocalTime(sys.sunrise, data.timezone);
  const sunset = toLocalTime(sys.sunset, data.timezone);

  const locationUrl = await getLocationImage(place);
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  saveLocationInfoInStorage({ place: place, locationUrl: locationUrl, lat: lat, lon: lon });



  return {
    place,
    lat: lat,
    lon: lon,
    description: weather.description,
    weatherParams: weatherParams,
    forecastData: forecastDisplay,
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

