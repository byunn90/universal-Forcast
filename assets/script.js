const buttonClick = document.getElementById("btn-control");
const container = document.querySelector(".container-block");
const container2 = document.querySelector(".container");
const hiddenClassStorage = document.querySelector(".hidden");
const unOrderList = document.querySelector("first-data-box");
const searchHistory = document.querySelector(".history-List");
let inputTextContent = document.getElementById("text-box");
let clearMyLocalStorage = document.querySelector(".clear-LocalStorage");

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
  locationImage(language);
  getGeolocation(language);
  hiddenClasses();
  mainContainer.innerHTML = "";
  LocalStorageHistory(language);
};

const locationImage = function (userInput) {
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/2560x1440/?" + userInput + "')";
};

const hiddenClasses = function () {
  container2.classList.remove("hidden");
  searchHistory.classList.remove("hidden");
  clearMyLocalStorage.classList.remove("hidden");
};

const LocalStorageHistory = function (userInput) {
  clearLocalStorage();
  const newArray = JSON.parse(localStorage.getItem("Searched History")) || [];
  newArray.push(userInput);
  const storage = userInput;
  const myKeyValue = "Searched History";
  localStorage.setItem(myKeyValue, JSON.stringify(newArray));
  // const gettingName = localStorage.getItem(myKeyValue, storage);
  let storageArray = JSON.parse(localStorage.getItem("Searched History")) || [];
  searchHistory.innerHTML = "";
  for (let index = 0; index < storageArray.length; index++) {
    console.log(storageArray[index]);
    let li = document.createElement("button");
    li.classList.add("historyButton");
    li.textContent = storageArray[index];
    searchHistory.appendChild(li);
  }
};
const clearLocalStorage = function (e) {};
// let historyButtons = document.querySelectorAll(".historyButton");
// for (let index = 0; index < historyButtons.length; index++) {
//   console.log("hi");
//   historyButtons[index].addEventListener("click", helloworld);
//   // getGeolocation(historyButtons[index].textContent)
// }
// function helloworld(userInput) {
//   console.log("hi");
//   getGeolocation(userInput);
// }

const getWeatherForcast = function (lat, lon) {
  const myApiKey = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=days&appid=7fe7d4a1f624f1850bb25c5e31c57e02`;
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
            src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png"
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
              <img class="country-img" src="https://openweathermap.org/img/wn/${
                day.weather[0].icon
              }.png"></img>
              <h1>${language.charAt(0).toUpperCase() + language.slice(1)}</h1>
              <h1 class="dates">${date.toString().substring(0, 16)}</h1>
              <h2 class="city-country-temps">temp: ${(
                day.feels_like.day - 273.15
              ).toFixed(1)}°C</h2>  
                <h2 class="wind-speed">Wind: ${(
                  day.wind_speed * 2.23694
                ).toFixed(1)} MPH</h2>
                  <h2 class="humidity">Humidity: ${day.humidity}%</h2>
          </div>
          
          `
        );
      });
    });
};

function getGeolocation(user) {
  const getMyLatLong = `https://api.openweathermap.org/geo/1.0/direct?q=${user}&limit=1&appid=54f233828acf58994eefa05b9027dd89`;

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
clearMyLocalStorage.addEventListener("click", function () {
  searchHistory.innerHTML = "";
  localStorage.clear();
  searchHistory.classList.add("hidden");
  clearMyLocalStorage.classList.add("hidden");
});
