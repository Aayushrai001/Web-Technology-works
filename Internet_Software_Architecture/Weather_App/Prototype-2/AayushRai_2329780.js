const apikey = "f0fcf241e38854707ee5bffd36e3dc8b";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

let city = "Auburn";

async function checkWeather(city){
    if (document.querySelector(".error").style.display == "block") {
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }

    if (!city) {
        document.querySelector(".error").innerHTML = "Please enter a city name.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);

        if(response.status == 404){
            document.querySelector(".error").innerHTML = "City not found.";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }
        else{
            var data = await response.json();

            console.log(data);

            const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
            document.querySelector(".date").innerHTML = new Date().toLocaleDateString('en-US', options);
            document.querySelector(".temp").innerHTML = data.main.temp + "&deg;C";
            document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
            document.querySelector(".pressure").innerHTML = data.main.pressure;
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
            document.querySelector(".ic").innerHTML = data.weather[0].description;

            const iconCode = data.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
            weatherIcon.src = iconUrl;

            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        document.querySelector(".error").innerHTML = "Unable to retrieve weather data. Please try again later.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }  
}

checkWeather(city);

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});
