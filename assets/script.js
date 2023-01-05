console.log("hi");
const buttonClick = document.querySelector(".btn");
// const mycords = navigator.geolocation;
// console.log(mycords);

function getWeatherForcast(lat, lon) {
  const myApiKey = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=54f233828acf58994eefa05b9027dd89`;
  console.log(lat, lon);
  fetch(myApiKey)
    .then((response) => response.json())
    .then((response) => console.log(response));
}

function getGeolocation() {
  const cityName = "melbourne";
  const getMyLatLong = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=54f233828acf58994eefa05b9027dd89`;

  fetch(getMyLatLong)
    .then((response) => response.json())
    .then((response) => {
      const lat = response[0].lat;
      const lon = response[0].lon;
      getWeatherForcast(lat, lon);
    });
}
function hello() {
  console.log("Hello");
}
// getWeatherForcast();
getGeolocation();

//Event Listeners
// Test The button
buttonClick.addEventListener("click", hello);
