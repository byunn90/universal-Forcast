const buttonClick = document.getElementById("btn-control");
// const inputText = document.querySelector(".form-control");
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

const buttonClickHandler = function (event) {
  event.preventDefault();
  var language = event.target.getAttribute("form-control");

  if (language) {
    getGeolocation(language);
    language.inputText;
    console.log("Hello");
  }
};

function getWeatherForcast(lat, lon) {
  const myApiKey = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=54f233828acf58994eefa05b9027dd89`;
  console.log(lat, lon);
  fetch(myApiKey)
    .then((response) => response.json())
    .then((response) => console.log(response));
}

function getGeolocation() {
  const cityName = "paris";
  const getMyLatLong = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=54f233828acf58994eefa05b9027dd89`;

  fetch(getMyLatLong)
    .then((response) => response.json())
    .then((response) => {
      const lat = response[0].lat;
      const lon = response[0].lon;
      getWeatherForcast(lat, lon);
    });
}
function hello(e) {
  e.preventDefault();
  console.log("Hello");
  console.log("welcome");
}
// getWeatherForcast();
getGeolocation();
//Event Listeners
// Test The button
buttonClickHandler();
buttonClick.addEventListener("click", hello);
