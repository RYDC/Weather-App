//API KEYS - will be changed when made public
const WEATHER_KEY = "6a715337c182b512970cb1d63225ecc2" 
const GEOCODE_KEY = "eSOgIc9V0pICMqBpaTjiOmpRmMt5Ineu"

//Event Listeners for Buttons
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("search").onclick = search;
});

function search(){
    let input = document.getElementById("input").value;
}


function getLoc(location){
    axios.get("http://open.mapquestapi.com/geocoding/v1/address?key="+GEOCODE_KEY+"&location="+location)
    .then(response => {
        console.log(response.data.results[0].locations[0].latLng)
    })
    .catch(error => console.error(error))
}

function getWeather(){
}



