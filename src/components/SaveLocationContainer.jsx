import { useContext } from "react";
import classes from "./SaveLocationContainer.module.css";
import { WeatherContext } from "../business-logic/context-providers/weatherContext";
import { useNavigate } from "react-router";
function SavedLocationContainer({ locationData }) {

    const { setCustomLatitideLongitude } = useContext(WeatherContext)
    const navigate = useNavigate();

    function clickHandler(lat,lon)
    {
        setCustomLatitideLongitude(lat,lon);
        navigate("/");
    }


    console.log(locationData);

    return (<div className={classes.savedLocation} onClick={()=>clickHandler(locationData.lat,locationData.lon)}>
        <img className={classes.imgDisplay} src={locationData.locationUrl} alt="locationImg" />
        <div className={classes.title}>
            <h4>{locationData.place}</h4>
        </div>

    </div>);
}

export default SavedLocationContainer;