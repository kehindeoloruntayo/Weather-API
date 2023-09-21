import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

   function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      $('.showWeather').text(`${city}'s weather condition is ${response.weather[0].main}.`);
      $('.showDescription').text(`${city} currently has ${response.weather[0].description}.`);
      $('.showWindspeed').text(`The wind speed is ${response.wind.speed}m/s.`);
      $('.showCountry').text(`${city} is located in ${response.sys.country}.`);
      $('.showTimezone').text(`${city}'s timezone is ${response.timezone}.`);
    }
  });
});