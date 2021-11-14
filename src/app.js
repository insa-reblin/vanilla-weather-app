funtion displayTempreture(reponse) {
    console.log(reponse,data.main.temp);
}


let apiKey = "edc18835dd6c780a8d86d394c2f2a19e";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTempreture);
