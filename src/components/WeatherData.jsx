import { RiSunCloudyFill } from "react-icons/ri";
import { IoCloudyOutline } from "react-icons/io5";
import classes from './WeatherData.module.css';
import { useContext } from "react";
import { WeatherContext } from "../business-logic/context-providers/weatherContext";


function WeatherData() {
    var { weatherData } = useContext(WeatherContext);
    console.log(weatherData); 
    return (
        weatherData == null ? <div></div> :
            <div className={classes.temparatureDisplay}>
                <div className={classes.time}>
                    <h4>{weatherData.currentTime}</h4>
                    <div>
                     <h4>{weatherData.description}</h4>
                     <img src={weatherData.iconUrl} alt="icon" />
                      <h3>{weatherData?.temperature != null ? `${weatherData.temperature}\u00B0C` : ""}</h3>

                    </div>
                    
                </div>

            </div>);

}

export default WeatherData;