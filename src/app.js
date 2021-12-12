function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    mintues = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDat(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function formatDay(date) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        ` 
     <div class="row">
                <div class="col-2">
                    <div class="weather-forecast-date">
                        ${formatDay(forecastDay.dt)}
                    </div>
                    <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" alt="" width="40"><img/>
                    <div class="weather-forecast-tempreture">
                        <span class="weather-forecast-temp-max">
                            ${Math.round(forecastDay.temp.max)}°
                        </span>
                        <span class="weather-forecast-temp-min">
                            ${Math.round(forecastDay.temp.min)}°
                        </span>
                    </div>
                </div>
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "edc18835dd6c780a8d86d394c2f2a19e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTempreture(response) {
  let tempretureElement = document.querySelector("#tempreture");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  tempretureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "edc18835dd6c780a8d86d394c2f2a19e";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempreture);
}

function handelSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempretureElement = document.querySelector("#tempreture");
  tempretureElement.innerHTML = Math.round(fahenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempretureElement = document.querySelector("#tempreture");
  tempretureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Singapore");
