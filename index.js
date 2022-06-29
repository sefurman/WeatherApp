//  display the current date and time using JavaScript:
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
    return minutes;
  }
  let formattedDate = `${day} ${hour}:${minutes} ${ampm}`;
  return formattedDate;
}
let dateElement = document.querySelector("h2.date-time");
let now = new Date();
dateElement.innerHTML = formatDate(now);

//let btnContainer = document.getElementsById("temp-unit");
//let btns = btnContainer.getElementsByClassName("unit");

//for (var i = 0; i < btns.length; i++) {
//  btns[i].addEventListener("click", function () {
//    let current = document.getElementsByClassName("active");
//    current[0].className = current[0].className.replace("active", "");
//    this.className += "active";
//  });
//}

//weather API

function showWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;
  let curCity = document.querySelector("#current-city");
  curCity.innerHTML = response.data.name;
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
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

//Current Location
function searchCurrentLocation(position) {
  let apiKey = "671866f89a984fb3a5b9a8d9a03a8914";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let searchForm = document.querySelector("#searchButton");
searchForm.addEventListener("click", searchInput);

let currentLocButton = document.querySelector("#currentLocationButton");
currentLocButton.addEventListener("click", getCurrentPosition);

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius

//function convertToFahrenheit(event) {
//  event.preventDefault();
//  let temperatureElement = document.querySelector("#current-temp");
//  temperatureElement.innerHTML = 66;
//}

//function convertToCelsius(event) {
//  event.preventDefault();
//  let temperatureElement = document.querySelector("#current-temp");
//  temperatureElement.innerHTML = 19;
//}
//let fahrenheitLink = document.querySelector("#fahrenheit");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//let celsiusLink = document.querySelector("#celsius");
//celsiusLink.addEventListener("click", convertToCelsius);