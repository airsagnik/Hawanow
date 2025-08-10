import { useEffect, useState } from "react";
import SavedLocationContainer from "../components/SaveLocationContainer";
import classes from './SavedLocations.module.css';
import { getSavedLocationFromStorage } from "../business-logic/api/currentWeather";

function SavedLocation() {

    const [savedLocationData, updateSavedLocation] = useState([]);

    useEffect(() => {
        getSavedLocationFromStorage().then((data) => updateSavedLocation(data));
    }, []);

    return (<div className={classes.savedLocationLayout}>
        {savedLocationData.map((data)=><SavedLocationContainer locationData={data}/>)}
    </div>);
}

export default SavedLocation;