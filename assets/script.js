const buttonClick = document.getElementById("btn-control");
const textBoxAreaHandler = document.getElementById("text-box");
const container = document.querySelector(".container-block");
const container2 = document.querySelector(".first-data-box");
// const mycords = navigator.geolocation;
// console.log(mycords);

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
  let inputTextContent = document.getElementById("text-box");
  e.preventDefault();
  container.innerHTML = "";
  if (inputTextContent.value === "") {
    return;
  }
  let language = inputTextContent.value;
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + language + "')";
  getGeolocation(language);
  console.log(language);
};

const getWeatherForcast = function (lat, lon) {
  const days = 5;
  const myApiKey = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=days&appid=54f233828acf58994eefa05b9027dd89`;
  console.log(lat, lon);
  fetch(myApiKey)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      // Create Elements

      const dateData = document.createElement("li");
      const weatherIcon = response.daily[0].weather[0].icon;
      const firstDataTemperature = document.createElement("li");
      const windData = document.createElement("li");
      const humidityData = document.createElement("li");
      const currentIcon = document.createElement("img");
      // Text and Img
      currentIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${weatherIcon}.png`
      );
      console.log(response.daily[0].weather[0].icon);
      firstDataTemperature.textContent =
        "🌡: " + (response.daily[0].temp.day - 273.15).toFixed(1) + "°C";
      humidityData.textContent = response.daily[0].humidity + "";
      windData.textContent = "🌫: " + response.daily[0].wind_speed + "";
      // Appends
      container2.appendChild(currentIcon);
      container2.appendChild(firstDataTemperature);
      container2.appendChild(windData);
      container2.appendChild(humidityData);
      response.daily.forEach((day, i) => {
        if (i >= 5) return;
        const date = new Date(day.dt * 1e3);
        // console.log(date);
        console.log(day);

        // console.log(date);
        container.insertAdjacentHTML(
          "beforeend",
          `
      
       
          <div class="country-data">
          <img class="country-img" src="http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }.png"></img>
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
        // }
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

// function checking() {
//   const lat = -37.8142176;
//   const lon = 144.9631608;
//   const days = 6;
//   const myApiKey = `api.openweathermap.org/data/2.5/forecast/daily??lat=${lat}&lon=${lon}&cnt=${days}&appid=54f233828acf58994eefa05b9027dd89`;
//   fetch(myApiKey)
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response);
//     });
// }
// checking();
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=54f233828acf58994eefa05b9027dd89`;
const checkingTwo = function () {
  const lat = -37.8142176;
  const lon = 144.9631608;
  const days = 6;
  myApi = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=days&appid=54f233828acf58994eefa05b9027dd89`;

  fetch(myApi)
    .then((res) => res.json())
    .then((res) => {
      let newThing = Date.now(res.daily[2].dt);
      // console.log(newThing);
      newThing = Math.round(Date.now(res.daily[0].dt) / 1000);
      // console.log(newThing);
      newThing = new Date().getTime() / 1000;
      console.log(newThing);
      console.log(res);
      // console.log(res.daily[4].dt);
      res.daily.forEach((res, i) => {
        // let dategosh = res.dt;
        // console.log(date);
        // console.log(i);
        // const date = new Date(res.dt * 1e3);
        // console.log(date.toString().substring(0, 16));
        // console.log(res.feels_like.day);
      });
    });
};
checkingTwo();
//  response.list.forEach((day, i) => {
// let date = new Date(1674352800);
// console.log(date);
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
// var date = new Date(unix_timestamp * 1000);
// // Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getDate();
// // Seconds part from the timestamp
// var seconds = "0" + date.getMonth();

// // Will display time in 10:30:23 format
// var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

// console.log(formattedTime);

// const dateStamp = new Date.now(1674328898);
// const date = dateStamp.getDate();
// const month = dateStamp.getMonth() + 1;
// const year = dateStamp.getFullYear();
// const output = `${date}/${month}/${year}`;
// console.log(output);

// let newThing = Date.now(1674525600);
// console.log(newThing);
// newThing = Math.round(Date.now() / 1000);
// console.log(newThing);
// newThing = new Date();
// console.log(newThing);
