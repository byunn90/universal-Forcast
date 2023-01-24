const buttonClick = document.getElementById("btn-control");
// const textBoxAreaHandler = document.getElementById("text-box");
const container = document.querySelector(".container-block");
const container2 = document.querySelector(".container");
const unOrderList = document.querySelector("first-data-box");
const searchHistory = document.querySelector(".history-List");
let inputTextContent = document.getElementById("text-box");

function Objectives() {
  /*
  we need a user input for the searching city
  we need to turn the weather temperature too degrees
  we need to show the weather and country 
  we must change the temperature from kelvin to degrees/celsius 
  we have to make a local storage everytime we search for a place
  we have to make a box area for the main city/country and that day 
  weather
  */
}
const formSubmitHandler = function (e) {
  e.preventDefault();
  const mainContainer = document.querySelector(".container");
  container.innerHTML = "";
  if (inputTextContent.value === "") {
    return;
  }
  let language = inputTextContent.value;
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/2560x1440/?" + language + "')";
  getGeolocation(language);
  mainContainer.innerHTML = "";
  container2.classList.remove("hidden");
  const newArray = JSON.parse(localStorage.getItem("Searched History")) || [];
  newArray.push(language);
  const storage = inputTextContent.value;
  const myKeyValue = "Searched History";
  localStorage.setItem(myKeyValue, JSON.stringify(newArray));
  const gettingName = localStorage.getItem(myKeyValue, storage);
  console.log(storage);
  console.log(gettingName);
  let storageArray = JSON.parse(localStorage.getItem("Searched History")) || [];
  searchHistory.innerHTML = "";
  // Refactor this code Please
  // Make functions
  for (let index = 0; index < storageArray.length; index++) {
    console.log(storageArray[index]);
    let li = document.createElement("button");
    li.classList.add("historyButton");
    li.textContent = storageArray[index];
    searchHistory.appendChild(li);
  }
};
// let historyButtons = document.querySelectorAll(".historyButton");
// for (let index = 0; index < historyButtons.length; index++) {
//   console.log("hi");
//   historyButtons[index].addEventListener("click", helloworld);
//   // getGeolocation(historyButtons[index].textContent)
// }
// function helloworld() {
//   console.log("hi");
//   getGeolocation(this.innerHTML);
// }

const localStorageF = function () {};

const getWeatherForcast = function (lat, lon) {
  const myApiKey = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=days&appid=54f233828acf58994eefa05b9027dd89`;
  console.log(lat, lon);
  language = inputTextContent.value;
  fetch(myApiKey)
    .then((response) => response.json())
    .then((response) => {
      // Create Elements
      response.daily.forEach((day, i) => {
        const date = new Date(day.dt * 1e3);
        if (i >= 1) return;
        container2.insertAdjacentHTML(
          "beforeend",
          `
          <div class="country-data-2">
          <img
          class="country-img"
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png"
          ></img>
          <h1>${language.charAt(0).toUpperCase() + language.slice(1)}</h1>
          <h1 class="dates">${date.toString().substring(0, 16)}</h1>
          <h2 class="city-country-temps">
          temp: ${(day.feels_like.day - 273.15).toFixed(1)}°C
          </h2>
          <h2 class="wind-speed">
          Wind: ${(day.wind_speed * 2.23694).toFixed(1)} MPH
          </h2>
          <h2 class="humidity">Humidity: ${day.humidity}%</h2>
          </div>
          `
        );
        console.log(day);
      });

      response.daily.forEach((day, i) => {
        if (i >= 5) return;
        const date = new Date(day.dt * 1e3);
        container.insertAdjacentHTML(
          "beforeend",
          `
            <div class="country-data-3">
          <img class="country-img" src="http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }.png"></img>
          <h1>${language.charAt(0).toUpperCase() + language.slice(1)}</h1>
          <h1 class="dates">${date.toString().substring(0, 16)}</h1>
          <h2 class="city-country-temps">temp: ${(
            day.feels_like.day - 273.15
          ).toFixed(1)}°C</h2>  
          <h2 class="wind-speed">Wind: ${(day.wind_speed * 2.23694).toFixed(
            1
          )} MPH</h2>
          <h2 class="humidity">Humidity: ${day.humidity}%</h2>
          </div>

        `
        );
      });
    });
};

function getGeolocation(user) {
  const getMyLatLong = `http://api.openweathermap.org/geo/1.0/direct?q=${user}&limit=1&appid=54f233828acf58994eefa05b9027dd89`;

  fetch(getMyLatLong)
    .then((response) => response.json())
    .then((response) => {
      if (response) {
        const lat = response[0].lat;
        const lon = response[0].lon;
        getWeatherForcast(lat, lon);
      }
    });
}

buttonClick.addEventListener("click", formSubmitHandler);
localStorageF();
const checkingTwo = function () {
  const lat = -37.8142176;
  const lon = 144.9631608;
  const days = 6;
  myApi = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=days&appid=54f233828acf58994eefa05b9027dd89`;

  fetch(myApi)
    .then((res) => res.json())
    .then((res) => {
      let newThing = Date.now(res.daily[2].dt);
      newThing = Math.round(Date.now(res.daily[0].dt) / 1000);
      newThing = new Date().getTime() / 1000;
      console.log(newThing);
      console.log(res);
    });
};
checkingTwo();
