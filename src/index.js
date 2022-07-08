//  display the current date and time
function formatDate(date) {
  let hour = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let ampm = "null";
  if (hour < 12) {
    ampm = "A.M.";
  } else if (hour > 12) {
    ampm = "P.M.";
    hour = hour - 12;
  } else if (hour === 0) {
    hour = 12;
    ampm = "A.M.";
  } else if (hour === 12) {
    ampm = "P.M.";
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${day} ${hour}:${minutes} ${ampm}`;
  return formattedDate;
}
let dateElement = document.querySelector("h2.date-time");
let now = new Date();
dateElement.innerHTML = formatDate(now);

//background change
var currentHour = now.getHours();
let background = document.querySelector("#background");
if (7 <= currentHour && currentHour < 20) {
  background.classList.add("day");
  background.classList.remove("night");
} else {
  background.classList.add("night");
  background.classList.remove("day");
}
//Forecast
const myNodelist = document.querySelectorAll(".weather-forecast");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      myNodelist[
        index
      ].innerHTML = `<div class="weather-forecast-date"><h4>${formatDay(
        forecastDay.dt
      )}</h4></div><img src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" class="small-icon" alt="${
        forecastDay.weather[0].description
      }"><div class="weather-forecast-temps"><span class="weather-forecast-max">${Math.round(
        forecastDay.temp.max
      )}° /</span><span class="weather-forecast-min"> ${Math.round(
        forecastDay.temp.min
      )}°</span></div>`;
    }
  });
}
function getForecast(coordinates) {
  let apiKey = "671866f89a984fb3a5b9a8d9a03a8914";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}
//Current Weather

function showWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let iconElement = document.querySelector("#large-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
//search
function searchCity(city) {
  let apiKey = "671866f89a984fb3a5b9a8d9a03a8914";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function searchInput(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input").value;
  searchCity(cityInputElement);
}

//Current Location
function searchCurrentLocation(position) {
  let apiKey = "671866f89a984fb3a5b9a8d9a03a8914";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searchInput);

let searchEnter = document.querySelector("#search-text-input");
searchEnter.addEventListener("submit", searchInput);

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
let currentLocButton = document.querySelector("#currentLocationButton");
currentLocButton.addEventListener("click", getCurrent);

//Unit conversion

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = "null";

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Baltimore");
