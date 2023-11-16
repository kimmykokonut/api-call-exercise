import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js';

// Business Logic
function getWeather(city) {
  WeatherService.getWeather(city)  //since this method returns a promise, can immediately call .then()
    .then(function (response) {
      if (response.main) { //this is the nesting for weather api-.main not true otehr api. asking if truthy.
        printElements(response, city);
      } else {
        printError(response, city);
      }
    });
}
// UI Logic
function printElements(response, city) {
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${response.main.humidity}%.
  The temperature in Kelvins is ${response.main.temp} degrees.`;
}
function printError(error, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:  ${error}`;
}
function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});