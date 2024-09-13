const API_key = '';
let city = 'curitiba';

const form = document.getElementById('search');
const searchCity = form.elements['search-city'];

toDo();

function toDo(){
    city = searchCity.value;
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

        })
        .catch(function (error) {
            console.log(error);
        });

}


form.addEventListener('submit', (event) => {
        toDo();
        event.preventDefault();
})

