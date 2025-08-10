import { IoMdSearch } from "react-icons/io";
import classes from "./searchbox.module.css";
import fetchAutoCompleteResults from "../business-logic/api/places-autocomplete";
import SearchSuggestions from "./SearchSuggestions";
import { useState, useRef } from "react";

function SearchBox(props) {

    const timeOutRef = useRef(null);

    const [cityList, updateCityList] = useState([]);
    const [showRecommendation,toggleRecommendationVisibility] = useState(false);

    async function fetchSugestions(value) {
        if (value.length >= 3) {
            if (timeOutRef.current) {
                clearTimeout(timeOutRef.current);
            }
            timeOutRef.current = setTimeout(async () => {
                const data = await fetchAutoCompleteResults(value);
                updateCityList(data);
            }, 1000)
        }
    }

   
    return (
        <div>
            <div className={classes.searchbox} onClick={()=>toggleRecommendationVisibility(true)}>
                <input type="text" id="search" className={classes.searchtextbox} placeholder="Search here..." onChange={(val) => fetchSugestions(val.target.value)} />
                <IoMdSearch className={classes.icon} />
            </div>
            <div className={classes.suggestionList}>
                {showRecommendation && cityList.map(cityDetails => {
                    return (<SearchSuggestions key={cityDetails.place_id} toggleRecommendation={toggleRecommendationVisibility} placeId={cityDetails.place_id} lat={cityDetails.lat} lon={cityDetails.lon} city={cityDetails.city} state={cityDetails.state} country={cityDetails.country} />);
                })}
            </div>
        </div>
    );
}


export default SearchBox;