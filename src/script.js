let now = new Date();

let p = document.querySelector("#currentDate");

let year = now.getFullYear();
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septmeber",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

if (minutes < 10) {
  p.innerHTML = `${month} ${date}, ${year} <br /> ${day}, ${hours}:0${minutes}`;
} else {
  p.innerHTML = `${month} ${date}, ${year} <br /> ${day}, ${hours}:${minutes}`;
}

function citySubmit(event) {
  event.preventDefault();
}

let form = document.querySelector("form");
form.addEventListener("submit", citySubmit);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector("#current-temp-min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°C`;
  document.querySelector("#current-temp-max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C`;
}

function searchCity(city) {
  let apiKey = "850527e679fdbc89b48a1c822ebc9f7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "850527e679fdbc89b48a1c822ebc9f7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
