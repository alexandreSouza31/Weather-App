/*api open weather pra testar eu uso o link com a key oferecida no menu "minhas keys" no site:
link:https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=
key:5455717c09524f86829bfe631bb63ec0                   */

const apiKey = "5455717c09524f86829bfe631bb63ec0";
const apiCountryImg = "https://www.countryflagicons.com/FLAT/64/png";

const container = document.querySelector(".container");
const weather = document.querySelector(".weather");
const city_input = document.querySelector(".city_input");
const search_btn = document.querySelector("#search");

// const h3 = document.querySelector(".h3");
// const placeIcon = document.createElement("i");
// placeIcon.classList="";
// placeIcon.appendChild(h3)

const city_element = document.querySelector(".city");
const temp_element = document.querySelector(".temperature span");
const wind_element = document.querySelector(".wind span");
const umidity_element = document.querySelector(".umidity span");
const desc_element = document.querySelector(".description");
const weather_icon = document.querySelector(".weather_icon");

//pega os dados do clima da api. Vai ser assíncrona, pq pode demorar pra responder
const getWeatherData = async (city) => {
    //o link abaixo eu pego no site da key, e adiciono "q=", a string do dado da cidade "${city}",
    //o modo de sistema métrico "&units=metric", a minha apiKey dentro de appid e por último buscar
    //os dados em ptbr
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    //sgora utilizar a fech api do js pra obter essa resposta:
    //await seve para esperar, nesse caso, esperar o fach
    const res = await fetch(apiWeatherUrl);
    // ele chega em json, vou transformar em objeto javascript:
    const data = await res.json();

    //console.log("esse é o data", data)
    //agr vou dar retorno na data pra usar esse retorno em outra função:
    return data;
};
//como a get é assíncrona, a show tbm precisa ser, pra não receber uma promisse:
const showWeatherData = async(city) => {
    const data = await getWeatherData(city);
    //pra pegar esses objetos acesso o devTools, Rede e a tarefa do weather aparecerá lá.

    const api_flag = document.querySelector(".api_flag");
    const api_nationality = data.sys.country;
    api_flag.setAttribute("alt", "bandeira do país")
    api_flag.setAttribute("src", `https://www.countryflagicons.com/SHINY/64/${api_nationality}.png`)

    city_element.innerText = `${data.name}, ${data.sys.country}`;//esse name vem do objeto da api
    temp_element.innerText = `${Math.round(data.main.temp)}°C`;//pro valor aparecer inteiro
    wind_element.innerText = `vento: ${data.wind.speed} Km/h`;
    umidity_element.innerText = `umidade: ${data.main.humidity}%`;
    desc_element.setAttribute("alt","condição climática")
    desc_element.innerText = `${data.weather[0].description}`;
    
    let icon = data.weather[0].icon;
    weather_icon.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
    //getIcon(icon)
};

search_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = city_input.value;
    weather.style.display = "flex";
    showWeatherData(city);
});

// function getIcon(icon) {
    
//     container.style.backgroundColor = ""
//     search_btn.style.backgroundColor = ""

//     if (icon == "04d") {
//         container.style.backgroundColor = "red"
//         console.log("Caiu no if")
//         console.log(icon)
//     }if (icon == "03d") {
//         container.style.backgroundColor = "green"
//         console.log("Caiu no if")
//         console.log(icon)
//     } else {
//         search_btn.style.backgroundColor = "blue"
//         console.log(icon)

//     }
// }
