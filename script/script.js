const apiKey = "5455717c09524f86829bfe631bb63ec0";
const apiCountryImg = "https://www.countryflagicons.com/FLAT/64/png";

const container = document.querySelector(".container");
const weather = document.querySelector(".weather");
const city_input = document.querySelector(".city_input");
const search_btn = document.querySelector("#search");

const city_element = document.querySelector(".city");
const temp_element = document.querySelector(".temperature span");
const wind_element = document.querySelector(".wind span");
const umidity_element = document.querySelector(".umidity span");
const desc_element = document.querySelector(".description");
const weather_icon = document.querySelector(".weather_icon");

const feedbackError = document.querySelector(".feedbackError");

const p_feedback = document.querySelector(".p-feedback");

//pega os dados do clima da api. Vai ser assíncrona, pq pode demorar pra responder
const getWeatherData = async (city) => {
    //o link abaixo eu pego no site da key, e adiciono "q=", a string do dado da cidade "${city}",
    //o modo de sistema métrico "&units=metric", a minha apiKey dentro de appid e por último buscar
    //os dados em ptbr
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    //agora utilizar a fech api do js pra obter essa resposta:
    //await seve para esperar, nesse caso, esperar o fach
    const res = await fetch(apiWeatherUrl);
    // ele chega em json, vou transformar em objeto javascript:
    const data = await res.json();

    if (data?.cod && data.cod === "404") {
        return errorMsg("Cidade não encontrada. Verifique a grafia")
    }

    //agr vou dar retorno na data pra usar esse retorno em outra função:
    return data;
};
//como a get é assíncrona, a show tbm precisa ser, pra não receber uma promisse:
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    //pra pegar esses objetos acesso o devTools, Rede e a tarefa do weather aparecerá lá.

    const api_flag = document.querySelector(".api_flag");
    const api_nationality = await data.sys.country;
    
    api_flag.setAttribute("alt", "bandeira do país")
    api_flag.setAttribute("src", `https://www.countryflagicons.com/SHINY/64/${api_nationality}.png`)

    city_element.innerText = `${data.name}`;//esse name vem do objeto da api
    city_element.style.color = "whitesmoke";
    temp_element.innerText = `${Math.round(data.main.temp)}°C`;//pro valor aparecer arredondado pra cima
    wind_element.innerText = `vento: ${data.wind.speed} Km/h`;
    umidity_element.innerText = `umidade: ${data.main.humidity}%`;
    desc_element.setAttribute("alt", "condição climática")
    desc_element.innerText = `${data.weather[0].description}`;

    let icon = data.weather[0].icon;
    weather_icon.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
    weather_icon.classList.add("desc_element_style");

};

search_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = city_input.value;
    if (city === "") {
        errorMsg("digite alguma cidade");
        return false;
    }
    weather.style.display = "flex";
    showWeatherData(city);
});

function errorMsg(msg) {
    feedbackError.classList.add("showError");
    feedbackError.style.display = "flex";
    weather.style.display = "none";
    p_feedback.innerText = msg;
    return;
}

//desaparecer a msg de erro pela própria div
feedbackError.addEventListener("click", () => {
    feedbackError.classList.remove("showError");
    feedbackError.style.display = "none"
    city_input.focus();
})


//desaparecer a msg de erro pelo clique no input
city_input.addEventListener("click", () => {
    feedbackError.classList.remove("showError");
    feedbackError.style.display = "none";
})


