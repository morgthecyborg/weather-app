//FUNCTIONALITY FIRST

//Create celcius farenheight conversion
//Forecast Next

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

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates){
  let apiKey = "946eb03de98f13f75348afbef5cbdb30";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showForecast);
}

function showWeather(response) {
  console.log(response.data);
  let celsiusElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-header");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  // icon ID from the API
  let iconId = response.data.weather[0].icon;

  celsiusElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
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
  // iconElement.setAttribute("src", displayWeatherIcon(iconURL));
  iconElement.className = displayWeatherIcon(iconId);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");
fahrenheit.addEventListener("click", showFahrenheitTemperature);
celsius.addEventListener("click", showCelsiusTemperature);

function showFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event){
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

// //Changes background color by time of day
// setInterval(change_background, 1000 * 60 * 60);

// function change_background() {
//   if (hours == 23 || hours < 20) {
//     document.body.className = "night";
//   } else if(hours == 20|| hours > 18){
//     document.body.className = "evening";
//   }else{
//     document.body.className = "daylight";
//   }
//   }
//   console.log("test");

// change_background();

function displayWeatherIcon(iconId){
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
  return "fa-solid " + iconClass + " fa-4x icon-cog";
}

function showForecast(response){
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
    if (index < 6){
      forecastHTML = forecastHTML + 
    `<div class="col dayOfWeek">
                <i class="${displayWeatherIcon(forecastDay.weather[0].icon)}"></i><br />
                <br />
                <h5 class="day">${formatDay(forecastDay.dt)}</h5>
                <p class="forecast-weather-temps"><span class="forecast-max">${Math.round(forecastDay.temp.max)}</span>° | <span class="forecast-min">${Math.round(forecastDay.temp.min)}</span>°</p>
    </div>`;
    }
  });

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}
