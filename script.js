const API_key = '';
let city = 'london';

const form = document.getElementById('search');
const searchCity = form.elements['search-city'];

toDo();

function toDo() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric&lang=pt_br`;
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);

            console.log(`${data.name}`); document.getElementById("city").innerHTML = `${data.name}, ${data.sys.country}`;

            const image_url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; document.getElementById("weather-icon").src = image_url;
            console.log(`Temperatura: ${data.main.temp} °C`); document.getElementById("temp").innerHTML = `${data.main.temp}`;
            console.log(data.weather[0].description); document.getElementById("weather-description").innerHTML = `${data.weather[0].description}`;

            console.log(`Mínima: ${data.main.temp_min} °C`); document.getElementById("temp-min").innerHTML = `${data.main.temp_min}`;

            console.log(`Máxima: ${data.main.temp_max} °C`); document.getElementById("temp-max").innerHTML = `${data.main.temp_max}`;

            console.log(`Humidade: ${data.main.humidity}%`); document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;

            console.log(`Velocidade do Vento: ${data.wind.speed}`); document.getElementById("speed").innerHTML = `${data.wind.speed}`;

            console.log(`Nuvens: ${data.clouds.all}`); document.getElementById("clouds").innerHTML = `${data.clouds.all}`;

            var theMap = new MyMap(data.coord.lat, data.coord.lon);
            theMap.redirectMap(data.coord.lat, data.coord.lon);

        })
        .catch(function (error) {
            console.log(error);
        });
}

class MyMap{
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
        this.map = L.map('map').setView([this.lat, this.lon], 10);
        this.outputMap();
    }

    outputMap() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
       this.createMarker()
    }

    createMarker() {
        L.marker([this.lat, this.lon]).addTo(this.map)
        .bindPopup('Está é a cidade pesquisada.')
        .openPopup();
    }

    set newLat(newLat) {
        this.lat = newLat
    }
    
    set newLon(newLon) {
        this.lon= newLon
    }

    redirectMap(newLat, newLon) {
        this.map = L.map('map').setView([newLat, newLon], 8);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

}


form.addEventListener('submit', (event) => {
    city = searchCity.value;
    toDo();
    event.preventDefault();
})

