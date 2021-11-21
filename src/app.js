function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = timestamp.getHours();
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


function displayTempreture(response) {
    let tempretureElement = document.querySelector("#tempreture");
    let cityElement = document.querySelector("city");
    let description = document.querySelector("description");
    let dateElement = document.querySelector("date");
    let iconElement = document.querySelector("icon");

    tempretureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    dateElement.innerHTML = formatDate(response,data.date * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}


let apiKey = "edc18835dd6c780a8d86d394c2f2a19e";
let city = "New York"
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTempreture);
