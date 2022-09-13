//Displays Date
function displayDate() {
  let now = new Date();
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = weekday[now.getDay()];
  let hours = now.getHours();
  hours = hours <= 9 ? "0" + hours : hours;
  let minutes = now.getMinutes();
  minutes = minutes <= 9 ? "0" + minutes : minutes;
  let today = `${day}, ${hours}:${minutes}`;
  return today;
}

let currentDatess = document.querySelector("#current-date");
currentDatess.innerHTML = displayDate();

// //Replaces header with input city
// function searchCity(event) {
//   event.preventDefault();
//   let searchCityInput = document.querySelector("#search-city-input");
//   let h1 = document.querySelector("#city-header");
//   h1.innerHTML = `${searchCityInput.value}`;
// }
// let inputCity = document.querySelector("#search-form");
// inputCity.addEventListener("submit", searchCity);

//Displays city's name + temperature
function showWeather(response) {
  console.log(response.data);
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city-header").innerHTML = response.data.name;
  document.querySelector("#description").innerhtml = response.data.weather[0].description;
}

function searchCityInput(city) {
  let apiKey = "946eb03de98f13f75348afbef5cbdb30";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function receieveSubmitInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCityInput(city);
}

let inputCity = document.querySelector("#search-form");
inputCity.addEventListener("submit", receieveSubmitInput);