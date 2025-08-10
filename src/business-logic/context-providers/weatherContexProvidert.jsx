import { useState, useEffect } from "react";
import fetchCurrentWeather from "../api/currentWeather";
import { WeatherContext } from "./weatherContext";


function WeatherProvider({ children }) {
    const [weatherData, setWeatherData] = useState(null);


    useEffect(() => {
        console.log("use effect called");
        navigator.geolocation.getCurrentPosition((position) => {
            fetchCurrentWeatherLatLon(position.coords.latitude, position.coords.longitude);
        })
    }, []);

    function setCustomLatitideLongitude(lat, lon) {
        console.log(lat);
        console.log(lon);
        console.log("set new lat lon");
        fetchCurrentWeatherLatLon(lat, lon);
    }



    async function fetchCurrentWeatherLatLon(lat, lon) {
        fetchCurrentWeather(lat, lon).then(result => {
            console.log("result has come");
            setWeatherData(result);
        }).catch(err => console.log(err));
    }

    return (
        <WeatherContext.Provider value={{ weatherData, setWeatherData, fetchCurrentWeatherLatLon, setCustomLatitideLongitude }}>
            {children}
        </WeatherContext.Provider>
    );

}

export default WeatherProvider;
