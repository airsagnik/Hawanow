import { useContext } from "react";
import classes from "./ForecastDisplay.module.css";
import { WeatherContext } from "../business-logic/context-providers/weatherContext";
function ForecastDisplay() {

    var { weatherData } = useContext(WeatherContext);

    return (<div className={classes.forecastCard}>
        {weatherData == null ? <div></div> : <div>
            {weatherData.forecastData.map((data) => {
                return <div className={classes.forecastDisplayParamsHolder}>
                    <div className={classes.forecastDisplayParams}>
                        <img src={data.iconUrl} alt="" />
                        <div>
                          <h6>{data.description}</h6>
                        </div>
                        
                    </div>
                    <div className={classes.forcastGrid}>
                       {data.weatherParams.map((params)=>{
                        return <ForecastWeatherParams title={params.title} value={params.value} unit={params.unit}/>
                       })}
                    </div>
                </div>
            })}
        </div>
        }
    </div>);
}

export default ForecastDisplay;

function ForecastWeatherParams({title,value,unit}) {
    return (<div className={classes.weatherForecastParamHolder}>
        <div>
            <h6>{title}</h6>
        </div>
        <div>
            {value} {unit}
        </div>
    </div>)
}