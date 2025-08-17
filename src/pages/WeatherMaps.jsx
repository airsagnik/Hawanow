import { useContext, useState } from 'react';
import classes from './WeatherMaps.module.css';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup } from 'react-leaflet';
import { WeatherContext } from '../business-logic/context-providers/weatherContext';
import { FaLocationDot } from "react-icons/fa6";
import { Icon } from "leaflet";
import locationIcon from './locationIcon.svg';
const myIcon = new Icon({
    iconUrl: locationIcon,
    iconSize: [25, 25]
});

function WeatherMaps() {
    var { weatherData } = useContext(WeatherContext);
    const [layer, setLayer] = useState("clouds_new");
    return (<div className={classes.parentDiv}>
        print("rebuild");
        <div className={classes.tileSelector}>

            <div className={classes.selector} onClick={() => {console.log("clicked");setLayer("precipitation_new")}}>Precipitation</div>
            <div className={classes.selector} onClick={() => setLayer("temp_new")}>Temperature</div>
            <div className={classes.selector} onClick={() => setLayer("pressure_new")}>Pressure</div>
            <div className={classes.selector} onClick={() => setLayer("clouds_new")}>Clouds</div>
            <div className={classes.selector} onClick={() => setLayer("wind_new")} >Windspeed</div>
        </div>
        <div className={classes.mapbox}>
            <MapContainer
                key={layer}
                center={[weatherData.lat, weatherData.lon]}
                zoom={13}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <TileLayer
                    openWeatherMapLayer={layer} apikey={process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY} attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openweathermap.org/map/{openWeatherMapLayer}/{z}/{x}/{y}.png?appid={apikey}"
                />


                <Marker position={[weatherData.lat, weatherData.lon]} icon={myIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    </div>);
}

export default WeatherMaps;