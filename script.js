class MyMap {
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
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }
        this.marker = L.marker([this.lat, this.lon]).addTo(this.map)
            .bindPopup('Está é a cidade pesquisada.')
            .openPopup();
    }

    set newLat(newLat) {
        this.lat = newLat;
    }

    set newLon(newLon) {
        this.lon = newLon;
    }

    redirectMap(newLat, newLon) {
        this.map.setView([newLat, newLon], 10);
        this.newLat = newLat;
        this.newLon = newLon;
        this.createMarker();
    }
}

const API_key = '';
let city = 'london';

const form = document.getElementById('search');
const searchCity = form.elements['search-city'];

var lat = 0;
var lon = 0;

toDo();
var theMap = new MyMap(lat, lon);

function toDo() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric&lang=pt_br`;
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);

            document.getElementById("city").innerHTML = `${data.name}, ${data.sys.country}`;

            const image_url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather-icon").src = image_url;
            document.getElementById("temp").innerHTML = `${data.main.temp}`;
            document.getElementById("weather-description").innerHTML = `${data.weather[0].description}`;
            document.getElementById("temp-min").innerHTML = `${data.main.temp_min}`;
            document.getElementById("temp-max").innerHTML = `${data.main.temp_max}`;
            document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
            document.getElementById("speed").innerHTML = `${data.wind.speed}`;
            document.getElementById("clouds").innerHTML = `${data.clouds.all}`;

            lat = data.coord.lat;
            lon = data.coord.lon;

            theMap.redirectMap(lat, lon);
        })
        .catch(function (error) {
            console.log(error);
        });
}

form.addEventListener('submit', (event) => {
    city = searchCity.value;

    toDo();
    event.preventDefault();
});
