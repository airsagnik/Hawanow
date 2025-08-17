import { FaLocationCrosshairs } from "react-icons/fa6";
import classes from "./WeatherDisplay.module.css";
import { FaPlus } from "react-icons/fa";
import WeatherData from './WeatherData';
import { useContext } from "react";
import { WeatherContext } from "../business-logic/context-providers/weatherContext";

function WeatherDisplay() {
    var { weatherData } = useContext(WeatherContext);
    return (
        <div>
            <div className={classes.currentLocHeader}>
                <div>
                    <h4>Current Location</h4>
                    <h2>{weatherData == null ? "" : weatherData.place}</h2>
                </div>
            </div>
            <div className={classes.currentLocWeatherDisplay}>
                <div className={classes.currentLocWeatherDetail}>
                    <div>
                        {weatherData == null ? <h5>Loading..</h5> :
                            <img className={classes.currentLocWeatherDetail} src={weatherData.locationUrl} alt="destinationphoto" />}
                        <div className={classes.weatherData}>
                            <WeatherData />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default WeatherDisplay;

