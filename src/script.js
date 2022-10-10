function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10){
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-header");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  // icon ID from the API
  let iconId = response.data.weather[0].icon;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  descriptionElement = response.data.weather[0].description;
  humidityElement = response.data.main.humidity;
  windElement = Math.round(response.data.wind.speed);
  dateElement = formatDate(response.data.dt * 1000);
  iconDescription = response.data.weather[0].main;
  // iconElement.setAttribute("src", displayWeathericon(iconURL));
  iconElement.className = displayWeathericon(iconId);
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

//Changes background color by time of day
setInterval(change_background, 1000 * 60 * 60);

function change_background() {
  if (hours == 23 || hours < 20) {
    document.body.className = "night";
  } else if(hours == 20|| hours > 18){
    document.body.className = "evening";
  }else{
    document.body.className = "daylight";
  }
  }
  console.log("test");

change_background();

function displayWeathericon(iconId){
  let iconClass = "";
  if (iconId === `01d`){
    iconClass = `fa-sun`;
  } else if (iconId === `01n`){
    iconClass = `fa-moon`;
  } else if (iconId === `02d`){
    iconClass = `fa-cloud-sun`;
  } else if (iconId === `02n`){
    iconClass = `fa-cloud-moon`;    
  } else if (iconId === `03d` || iconId === `03n` || iconId === `04d` || iconId ===`04n`){
    iconClass = `fa-cloud`;
  } else if (iconId === `09d`){
    iconClass = `fa-cloud-rain`;
  } else if (iconId ===`09n`){
    iconClass = `fa-cloud-moon-rain`
  } else if (iconId === `10d`){
    iconClass = `fa-cloud-showers-heavy`;
  } else if (iconId ===`10n`){
    iconClass = `fa-cloud-moon-rain`
  } else if (iconId === `11d` || iconId ===`11n`){
    iconClass = `fa-cloud-bolt`;
  } else if (iconId === `13d` || iconId === `13n`){
    iconClass = `fa-snowflake`;
  } else if (iconId === `50d` || iconId === `50n`){
    iconClass = `fa-smog`;
  }
  return "fa-solid " + iconClass + " fa-7x icon-cog";
}
