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
    let days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;

}

function formatDat(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];

    return days[day];
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
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search (city) {
let apiKey = "edc18835dd6c780a8d86d394c2f2a19e";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTempreture);

}


function handelSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("city-input");
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

let form = document.querySelector("search-form");
form.addEventListener("submit", handelSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("clik", displayFahrenheitTemp);

let celsuisLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("clik", displayCelsiusTemp);

search("Singapore");