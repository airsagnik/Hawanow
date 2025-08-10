async function fetchAutoCompleteResults(initials)
{
     try {
        const apiKey = process.env.REACT_APP_SEARCH_AUTO_COMPLETE_API_KEY;
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${initials}&lang=en&limit=10&type=city&format=json&apiKey=${apiKey}`);
        const data = await response.json();
        //console.log(data["results"]);
        return data["results"];
    }
    catch (error) {
        console.log("error fetching data");
    }
}


export default fetchAutoCompleteResults