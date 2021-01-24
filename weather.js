const weather = document.querySelector(".js-weather");

const API_KEY = "0ecd949f9afe338731fe72bfca529d39";
const COORDS = 'coords';

function getWaether(lat,lng)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    
    .then(function(response){
        return response.json();
    })
    .then(function (json){
        console.log(json)
        const temperature = json.main.temp;
        const place = json.name;
        const country = json.sys.country;
        weather.innerText = ` Country : ${country}

        City : ${place} 
        
        Temp : ${temperature}˚C`;

    });
    
}

function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position)
{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWaether(latitude,longitude);
}

function handleGeoError()
{
    console.log("can't access geo location");
}

function askForCoords()
{
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords()
{
    const loadedCoords = localStorage.getItem(COORDS);

    if(loadedCoords === null)
    {
        askForCoords();
    }
    else
    {
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWaether(parseCoords.latitude,parseCoords.longitude);
    }
}

function init()
{
    loadCoords();
}

init();