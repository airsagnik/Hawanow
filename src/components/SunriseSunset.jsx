import TextWithIcon from "./TextWithIcon";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import classes from "./SunriseSunset.module.css";
import { useContext } from "react";
import { WeatherContext } from "../business-logic/context-providers/weatherContext";



function SunriseSunset() {
    var { weatherData } = useContext(WeatherContext);
    console.log(weatherData);

    return (

        weatherData == null ? <div></div> :
            <div className={classes.SunriseSunset}>
                <TextWithIcon icon={<FiSunrise height="40px" width="40px" />} title={weatherData.sunrise} />
                <TextWithIcon icon={<FiSunset height="40px" width="40px" />} title={weatherData.sunset} />
            </div>
    );
}

export default SunriseSunset;