var lat = 0;
var lon = 0;
var api = "https://fcc-weather-api.glitch.me/api/current?";
var googleMapsApi = "https://maps.googleapis.com/maps/api/geocode/json?latlng="

console.log(navigator);

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function (position) {
 lat = "lat=" + position.coords.latitude;
 lon = "lon=" + position.coords.longitude;
fetch(googleMapsApi + position.coords.latitude + "," + position.coords.longitude)
.then(function(response) {
  return response.json();
})
.then(function(data) {
  getCurrentAdress(data);
})

 fetch(api + lat + "&" + lon)
 .then(function(response) {
   return response.json();
 })
.then(function(data) {
createWeatherObj(data);
});
});
}

function getCurrentAdress(data) {
  console.log(data);
  var address = data.results[1].formatted_address;
  document.getElementById('address').innerHTML = 'Your Address is: <br/>' + address;
}


function createWeatherObj(data) {

  var icon;
  switch(data.weather[0].main) {
    case "Clouds":
    icon = "cloud";
    break;
    case "Clear":
    icon = "sun-o";
    break;
   case "Rain":
   icon = "tint";
   break;
    default:
    icon  = "sun-o";
  }

var fahrenheit = Math.round(data.main.temp * 9 / 5 + 32)


document.getElementById('weather').innerHTML = '<h2>Current Temp</h2><h1>' + fahrenheit + ' &degF</h1><h3>'
+ data.weather[0].main + '</h3><i style="font-size: 100px" class="fa fa-' + icon + '"></i>';
console.log(data);
}
