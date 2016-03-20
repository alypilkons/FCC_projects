var apiURL = "http://api.openweathermap.org/data/2.5/weather?";

var apiKey = "&APPID=f6380845134a76a320432c07c8379c92";

var coordinates;
var lat;
var long;
var conditions;

var findWeather = function() {
  $.getJSON('http://ipinfo.io', (function(location){
    $('#location').html(location.city + ", " + location.country);
    coordinates = location.loc.split(",");
    lat = "lat=" + coordinates[0];
    long = "&lon=" + coordinates[1];
    
    $.getJSON(apiURL + lat + long + apiKey, function(weather) {
      $("#temperature").html(Math.round((weather.main.temp - 273) * 1.8 + 32) + " \xB0 F");
      
      $("#FButton").click(function(){
        $("#temperature").html(Math.round((weather.main.temp - 273) * 1.8 + 32) + " \xB0 F");
      });
      
      $("#CButton").click(function(){
 $("#temperature").html(Math.round(weather.main.temp - 273.15) + " \xB0 C");
      });
      
      conditions = weather.weather[0].main;
      $("#conditions").html(conditions);
      
      if (conditions === "Clear") {
      $("body").addClass("clear");
      };
      
      if (conditions === "Rain") {
        $("body").addClass("rain");
      };
      
      if (conditions === "Mist") {
        $("body").addClass("mist");
      }
      
      if (conditions === "Clouds") {
        $("body").addClass("clouds");
      };
      
      if(conditions === "Snow") {
        $("body").addClass("snow");
      };
      
      if(conditions === "Thunderstorm") {
        $("body").addClass("thunderstorm");
      };
      
      if(conditions === "Haze") {
        $("body").addClass("haze");
      };
      
    })
  })
 );
}

window.onload = findWeather();