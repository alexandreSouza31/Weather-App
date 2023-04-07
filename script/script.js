/*api open weather pra testar eu uso o link com a key oferecida no menu "minhas keys" no site:
link:https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=
key:5455717c09524f86829bfe631bb63ec0                   */

const apiKey = "5455717c09524f86829bfe631bb63ec0";
// const apiCountryImg = "https://www.countryflagicons.com/FLAT/64/png";

const city_input = document.querySelector(".city_input");
const search_btn = document.querySelector("#search");

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
    city_element.innerText = `${data.name}, ${data.sys.country}`;//esse name vem do objeto da api
    temp_element.innerText = parseInt(data.main.temp);//pro valor aparecer inteiro
    wind_element.innerText = `${data.wind.speed} Km/h`;
    umidity_element.innerText = `${data.main.humidity} %`;
    desc_element.innerText = `${data.weather[0].description}`;
    weather_icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
};



search_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const city=city_input.value;
    showWeatherData(city);
    console.log(city.value)
});




