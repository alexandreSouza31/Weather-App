
# weather-tool

Project that shows the current weather of a city consuming an api

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [How to run the code](#How-to-run-the-code)
  - [Author](#author)

## Overview

### Screenshot

![search_web](https://user-images.githubusercontent.com/112407769/230801591-f10148ae-5e4e-4c78-9037-12742cedfaf3.png)
![error_web](https://user-images.githubusercontent.com/112407769/230801588-167592ab-5335-4668-9fed-14de520dc92f.png)
![search_mobile](https://user-images.githubusercontent.com/112407769/230801593-38c5139e-21a6-4f0d-82de-a278c93a03c2.png)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
- javascript
- api consumption

### What I learned

```css 
***background effects:***

html,
body {
    background: linear-gradient(180deg, rgb(101, 100, 98) 0%, rgb(255, 255, 255) 100%);
}

***placeholder change color:***

.city_input::placeholder {
    color: rgb(186, 186, 186);
  }

```
```js

function that takes the data and another one that shows the data from the api:***

const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    const res = await fetch(apiWeatherUrl);
    const data = await res.json();

    if (data?.cod && data.cod === "404") {
        return errorMsg("Cidade não encontrada. Verifique a grafia")
    }

    return data;
};
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    const api_flag = document.querySelector(".api_flag");
    const api_nationality = await data.sys.country;
    
    api_flag.setAttribute("alt", "bandeira do país")
    api_flag.setAttribute("src", `https://www.countryflagicons.com/SHINY/64/${api_nationality}.png`)

    city_element.innerText = `${data.name}`;
    city_element.style.color = "whitesmoke";
    temp_element.innerText = `${Math.round(data.main.temp)}°C`;
    wind_element.innerText = `vento: ${data.wind.speed} Km/h`;
    umidity_element.innerText = `umidade: ${data.main.humidity}%`;
    desc_element.setAttribute("alt", "condição climática")
    desc_element.innerText = `${data.weather[0].description}`;

    let icon = data.weather[0].icon;
    weather_icon.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
    weather_icon.classList.add("desc_element_style");
};

```

### Continued development

```
Using data from an api, clean code, refactoring.
```
### Useful resources

- [Openweathermap](https://openweathermap.org/) - helped me with the api I used to return the data

### How to run the code

 Clonando/baixando o projeto

 Digite o comando ```git clone https://github.com/alexandreSouza31/weather-tool``` no terminal, ou se preferir, baixe clicando no botão verde chamado "Code" no repositório deste projeto, e em seguida, "Download zip.


:)

## Author
- LinkdIn - Alexandre Mariano(https://www.linkedin.com/in/alexandresouza31/)

