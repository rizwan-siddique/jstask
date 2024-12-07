const inputBox = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const cityName = document.querySelector('.city');
const desc = document.querySelector(".desc");
const temperature = document.querySelector(".temp")
const hum = document.querySelector(".hum")
const wspeed = document.querySelector(".wspeed")
const details = document.querySelector(".details")
const loader = document.querySelector(".loader")
const error = document.querySelector(".error")
const API_KEY = "7812bfee4e395d4374747cd785371c08"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

searchBtn.addEventListener("click", function() {
    const city = inputBox.value;
    getWeather(city)
})

async function getWeather(city) {
    try {
        loader.classList.remove("hidden")
        details.classList.add("hidden")
        error.classList.add("hidden")
        const res = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`)
        const data = await res.json()
        console.log(data)
        if (data?.message === "city not found") {
            error.classList.remove("hidden")
            error.innerText = data?.message
            return
        }
        const temp = Math.round(data.main.temp - 273.15)
        const description = data.weather[0].main
        const humidity = data.main.humidity
        const windSpeed = data.wind.speed
        details.classList.remove("hidden")
        cityName.innerText = city
        temperature.innerText = temp;
        desc.innerText = description;
        hum.innerText = humidity;
        wspeed.innerText = windSpeed;
    } catch(err) {
        error.classList.remove("hidden")
        error.innerText = "Error in fetching weather"
    } finally {
        loader.classList.add("hidden")
    }
}