const apiKey = "f33dc1da5775205a8018460592e3fa41";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherImg = document.querySelector(".weather-img");

async function checkWeather (cityName) {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    let data = await response.json();

    if (response.status === 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".all-in-it").style.display = "none";
    }
    else{
        document.querySelector(".cityName").innerHTML = data.name;
        document.querySelector(".conditions").innerHTML = data.weather[0].main;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    
        if (data.weather[0].main == "Clouds") {
            weatherImg.src = "images/cloudy.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherImg.src = "images/rainy.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherImg.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Haze") {
            weatherImg.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherImg.src = "images/snow.png";
        }
    
        document.querySelector(".all-in-it").style.display = "block";
        document.querySelector(".error").style.display = "none";

        setTimeout(() => {
            animateWeatherImage();
        }, 500);
    }

    function animateWeatherImage() {
        const weatherImg = document.querySelector(".weather-img");
        weatherImg.style.display = "block";
        weatherImg.classList.add("animate__fadeInRight"); 
        weatherImg.addEventListener("animationend", () => {
            weatherImg.classList.remove("animate__fadeInRight");
        });}

}

searchButton.addEventListener("click", ()=> {
    weatherImg.style.display = "none";
    checkWeather(searchBox.value);
} )
