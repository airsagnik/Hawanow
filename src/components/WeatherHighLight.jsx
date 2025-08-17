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
                    {weatherData.weatherParams.map((data) => <WeatherParamContainer key={data.title} title={data.title} child={<h2>{data.value} {data.unit}</h2>} />)}
                </div>}
        </div>
    );
}

export default WeatherHighlight;