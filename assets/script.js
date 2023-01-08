const buttonClick = document.getElementById("btn-control");
const textBoxAreaHandler = document.getElementById("text-box");
const container = document.querySelector(".container-block");
// const mycords = navigator.geolocation;
// console.log(mycords);

function Objectives() {
  /*
  we need a user input for the searching city
  we need to turn the weather temperature too degrees
  we need to show the weather and country 
  we must change the temperature from kelvin to degrees/celsius
  
  */
}

const formSubmitHandler = function (e) {
  let inputTextContent = document.getElementById("text-box");
  e.preventDefault();
  container.innerHTML = "";
  if (inputTextContent.value === "") {
    return;
  }
  let language = inputTextContent.value;
  getGeolocation(language);
  console.log(language);
};

const getWeatherForcast = function (lat, lon) {
  const myApiKey = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=54f233828acf58994eefa05b9027dd89`;
  console.log(lat, lon);
  fetch(myApiKey)
    .then((response) => response.json())
    .then((response) => {
      response.list.forEach((day, i) => {
        if (i >= 5) return;
        console.log(day);
        let date = day.dt_txt.substring(0, 10);
        console.log(date[9]);
        container.insertAdjacentHTML(
          "beforeend",
          `
          <div class="country-data">
          <img class="country-img" src="http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }.png"></img>
          <h1 class="dates">${day.dt_txt.substring(0, 10)}</h1>
          <h2 class="city-country-temps">temp: ${(
            +day.main.temp - 273.15
          ).toFixed(1)}°C</h2>  
          <h2 class="wind-speed">Wind: 6</h2>
          <h2 class="humidity">Humidity: 6</h2>
          </div>
        `
        );
        // }

        console.log(day.weather.icon);
      });
      console.log(response);
    });
};

const getGeolocation = function (user) {
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
};

// getWeatherForcast();

//Event Listeners
// Test The button
// formSubmitHandler();
// buttonClick.addEventListener("click", idkidk);
buttonClick.addEventListener("click", formSubmitHandler);
