import WeatherParamContainer from "./WeatherParamContainer";
import classes from "./WeatherHighLight.module.css";
import SunriseSunset from "./SunriseSunset";
import TempGraph from "./TempGraph";
import { useContext } from "react";
import { WeatherContext } from "../business-logic/context-providers/weatherContext";

function WeatherHighlight() {
    var { weatherData } = useContext(WeatherContext);
    return (
        <div>
            <h3>Todays Highlights</h3>
            {weatherData == null ? <div></div> :
                <div className={classes.weatherHighlight}>
                    <WeatherParamContainer title="Precipitation" child={<h2>{weatherData.rain}%</h2>} />
                    <WeatherParamContainer title="Humidity" child={<h2>{weatherData.humidity}%</h2>} />
                    <WeatherParamContainer title="Wind" child={<h2>{weatherData.windSpeed} km/hr</h2>} />
                    <WeatherParamContainer title="Sunrise and Sunset" child={<SunriseSunset />} />

                </div>}
            <br />
            <WeatherParamContainer title="Today" option={"Week"} child={<TempGraph />} />
        </div>
    );
}

export default WeatherHighlight;