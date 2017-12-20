'use strict';

/**
 * <CAUTION>: Need to create for mavboard using Jasons email
 * weather
 * underground 179c1650862e6f2a
 * http://api.wunderground.com/api/179c1650862e6f2a/conditions/q/MN/Minneapolis.json
 */

var $ = id => {
  var ele = null;
  try {
    ele = document.getElementById(id);
  } catch (err) {
    console.log(err);
  }
  return ele;
};

let weatherMinneapolis = () => {
  let container = $('weather');
  let appID = '179c1650862e6f2a';
  let state = 'MN';
  let city = 'Minneapolis';

  loadWeatherByCityID(appID, state, city, container);
  // setInterval(() => {loadWeatherByCityID(appID, cityID, container);}, 30000);
};

/**
 * Load weather by State/City name to container
 * Ex. MN/Minneapolis
 *
 * appID: required by providers to use api.
 * state: abbreviated state
 * city: name of city in state
 * container:
 */
let loadWeatherByCityID = (appID, state, city, container) => {
  var http = new XMLHttpRequest();

  // Add spinner
  container.innerHTML = '<img id="spinner_' + state + city + '" src="../imgs/spinner.gif" alt="spinner gif">';
  http.onreadystatechange = () => {
    if (http.readyState == 4 && http.status == 200) {
      var response = http.responseText;
      container.innerHTML = processWeatherJson(response, state, city);
    }
  };

  var url = "http://api.wunderground.com/api/" + appID + "/conditions/q/" + state + "/" + city + ".json";
  http.open("GET", url, true);
  http.send();
};

/**
 * Extract needed weather info from
 * response and create container div
 *
 * :param responseJson: response of api request to
 *                      weather underground.
 */
let processWeatherJson = (responseJson, state, city) => {
  var jsonObj = JSON.parse(responseJson);

  // weather observations
  var observation = jsonObj.current_observation;

  var weatherView = '<div id="weather_' + state + '_' + city + '">';

  var temp_f = observation.temp_f;
  var feelTemp_f = observation.feelslike_f;

  weatherView += temp_f + '<br>';
  weatherView += feelTemp_f + '<br>';
  weatherView += '</div>';

  return weatherView;
};