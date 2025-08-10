import classes from './SearchSuggestions.module.css';
import { useContext } from 'react';
import { WeatherContext} from '../business-logic/context-providers/weatherContext';
function SearchSuggestions({placeId,lat,lon,city,state,country,toggleRecommendation}) {
    var { fetchCurrentWeatherLatLon } = useContext(WeatherContext);
    
    function onClickHandler(lat,lon)
    {
        toggleRecommendation(false);
        fetchCurrentWeatherLatLon(lat,lon);
    }


    return (
         <div className={classes.cityHolder} onClick={()=>onClickHandler(lat,lon)}>
            <h3>{city}</h3>
            <h5>{state} {country}</h5>
         </div>
    );
}

export default SearchSuggestions;