//API KEYS - will be changed when made public
const WEATHER_KEY = "6a715337c182b512970cb1d63225ecc2" 
const GEOCODE_KEY = "eSOgIc9V0pICMqBpaTjiOmpRmMt5Ineu"

//Event Listeners for Buttons
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("search").onclick = search;
});

function search(){
    let input = document.getElementById("input").value;
    getLoc(input)

}


function getLoc(location){//Convert inputted location into longitude and latitude
    axios.get("http://open.mapquestapi.com/geocoding/v1/address?key="+GEOCODE_KEY+"&location="+location)
    .then(locResp => {
        getWeather(locResp.data.results[0].locations[0].latLng)
    })
    .catch(error => console.error(error))
}

function getWeather(latLng){//Take long and lat to make a request for weather
    let lat = latLng.lat
    let lon = latLng.lng
    axios.get("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid="+WEATHER_KEY)
    .then(response => {
        console.log(response)
        //console.log(response.data.daily.length)
        let workspace = document.getElementById("weather")
        workspace.innerHTML = ""
        for(let i = 0;i<response.data.daily.length;i++){
            let weekly = response.data.daily[i]
            
            //Creating list item
            let listItem = document.createElement("li")
            listItem.classList = "list-group-item"
            if(i==0)
                listItem.classList+=" bg-light"

            //Creating Image 
            let image = document.createElement("img")
            image.classList="image"
            image.src="assets/rainycloud.png"
            listItem.appendChild(image)

            //Creating day label
            let date = new Date(weekly.dt * 1000)
            let dateLabel = document.createElement("span")
            dateLabel.classList = "date display-1"
            dateLabel.innerHTML =  date.toDateString()
            listItem.appendChild(dateLabel)

            //Container for holding highest and lowest temp
            let spanContainer = document.createElement("span")
            spanContainer.id = "tempspan"
            
            //Lowest Temp
            let tempLow = document.createElement("span")
            tempLow.id = "tempspanlow" 
            tempLow.innerHTML = Math.round((weekly.temp.min- 273.15) * 9/5 + 32) + "&#730"
            spanContainer.appendChild(tempLow)
            spanContainer.innerHTML += " / "

            //Highest Temp
            let tempHigh = document.createElement("span")
            tempHigh.id = "tempspanhigh" 
            tempHigh.innerHTML = Math.round((weekly.temp.max- 273.15) * 9/5 + 32) + "&#730"
            spanContainer.appendChild(tempHigh)
            listItem.appendChild(spanContainer)

            //expand arrow container
            let expand = document.createElement("a")
            expand.classList="downarrow"
            expand.href = "#expand" + i
            expand.setAttribute("data-toggle","collapse")

            //expand arrow icon
            let arrow = document.createElement("i")
            arrow.classList="fa fa-angle-down"
            expand.appendChild(arrow)
            listItem.appendChild(expand)

            //container for extra information
            let details = document.createElement("div")
            details.classList = "collapse"
            details.id = "expand" + i
            details.appendChild(document.createElement("br"))

            //Precipitation Chance
            let rainchance = document.createElement("p")
            rainchance.classList = "details"
            rainchance.innerHTML = "Chance of Rain: " + weekly.pop * 100 + "%"
            details.appendChild(rainchance)
            
            //Humidity
            let humidity = document.createElement("p")
            humidity.classList = "details"
            humidity.innerHTML = "Humidity: " + weekly.humidity + "%"
            details.appendChild(humidity)

            //wind speed
            let windspd = document.createElement("p")
            windspd.classList = "details"
            windspd.innerHTML = "Wind: " + Math.round(weekly.wind_speed * 2.237) + " mph"
            details.appendChild(windspd)


            listItem.appendChild(details)
            workspace.appendChild(listItem)

        }
        
    })
}




