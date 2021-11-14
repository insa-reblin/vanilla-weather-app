funtion displayTempreture(reponse) {
    console.log(reponse,data.main.temp);
    let tempretureElement = document.querySelector("#tempreture");
    let cityElement = document.querySelector("city");
    let descrpition = document.querySelector("descrpition");
    tempretureElement.innerHTML = Math.round(reponse.data.main.temp);
    cityElement.innerHTML = reponmse.data.name;
    descrpition.innerHTML = response.data.weather[0].descrpition;

}


let apiKey = "edc18835dd6c780a8d86d394c2f2a19e";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTempreture);
