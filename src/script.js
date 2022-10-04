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
  let temperatureElement = document.querySelector("#temperature")
  let cityElement = document.querySelector("#city-header");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement = response.data.weather[0].description;
  humidityElement = response.data.main.humidity;
  windElement = Math.round(response.data.wind.speed);
  dateElement = formatDate(response.data.dt * 1000 );
  iconElement.setAttribute("src", displayImage(response.data.weather[0].icon));
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

function displayWeathericon(icon){
  let iconURL = "";
  if (icon === `01n.png`){
    icon = `fa-solid fa-sun fa-7xl icon-cog`;
  } else if (icon === `01n.png`){
    icon = `fa-solid fa-moon-stars fa-7xl icon-cog`;
  } else if (icon === `02d.png`){
    icon = `fa-solid fa-cloud-sun fa-7xl icon-cog`;
  } else if (icon === `02n.png`){
    icon = `fa-solid fa-cloud-moon fa-7xl icon-cog`;    
  } else if (icon === `03d.png` || icon === `03n.png`){
    icon = `fa-solid fa-cloud fa-7xl icon-cog`;
  } else if (icon === `04d.png` || icon ===`04n.png`){
    icon = `fa-solid fa-clouds fa-7xl icon-cog`;
  } else if (icon === `09d.png` || icon ===`09n.png`){
    icon = `fa-solid fa-cloud-drizzle fa-7xl icon-cog`;
  } else if (icon === `10d.png` || icon ===`10n.png`){
    icon = `fa-solid fa-cloud-showers-heavy fa-7xl icon-cog`;
  } else if (icon === `11d.png`){
    icon = `fa-solid fa-cloud-bolt-sun fa-7xl icon-cog`;
  } else if (icon ===`11n.png`){
    icon = `fa-solid fa-cloud-bolt-moon fa-7xl icon-cog`;
  } else if (icon === `13d.png` || icon === `13n.png`){
    icon = `fa-solid fa-snowflakes fa-7xl icon-cog`;
  } else if (icon === `50d.png` || `50n.png`){
    icon = `fa-solid fa-smog fa-7xl icon-cog`;
  }
return iconURL;
}