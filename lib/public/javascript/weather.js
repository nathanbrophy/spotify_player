'use strict';

var currSlide = 1; // Control variable for current position in the slideshow

/**
 * Called to display the dynamic content from the national weather
 * service API to the user.
 */
function displayWeather() {
	var x = new XMLHttpRequest();

	x.onreadystatechange = function () {
		if (x.readyState == 4 && x.status == 200) {
			const data = JSON.parse(x.responseText);
			const forecast = data.properties.periods;

			for (var i = 0; i < forecast.length; i++) {
				var elem = document.createElement('div');
				elem.classList.add('fade');
				elem.classList.add('slides');
				elem.innerHTML = buildDynamicWeatherFull(forecast[i]);

				document.getElementById('weather-wrapper').appendChild(elem);
			}

			var slides = document.getElementsByClassName("slides");
			slides[0].style.display = 'block';
			setInterval(slideShow, 10000);
		} else {
			console.log(`Errored on ready state ${x.readyState} with status code ${x.status}`);
		}
	};

	x.open('GET', 'https://api.weather.gov/gridpoints/MPX/108,71/forecast', true);
	x.send();
}

/**
 * The function runs every 10 seconds to switch the currently
 * displayed weather info in a queue
 */
function slideShow() {
	var slides = document.getElementsByClassName("slides");
	for (var s = 0; s < slides.length; s++) {
		slides[s].style.display = 'none';
	}
	slides[currSlide].style.display = 'block';

	currSlide++;
	if (currSlide >= slides.length) currSlide = 0;
	//setTimeout(slideShow, 10000);
}

/**
 * Given the current wind direction, find the correct unicode
 * arrow to display.
 *
 * @param {string} d is the wind direction
 * @returns {string} unicode arrow string
 */
function getWeatherDirectionUnicode(d) {
	var windDirection = "";if (d === "N") {
		windDirection = "&uarr;";
	} else if (d === "S") {
		windDirection = "&darr;";
	} else if (d === "E") {
		windDirection = "&rarr;";
	} else if (d === "W") {
		windDirection = "&larr;";
	} else if (d.includes("NW")) {
		windDirection = "&#8598;";
	} else if (d.includes("NE")) {
		windDirection = "&#8599;";
	} else if (d.includes("SW")) {
		windDirection = "&#8601;";
	} else {
		windDirection = "&#8600;";
	}
	return windDirection;
}

/**
 * Build a dom elem string for that forecast item.
 *
 * @param {JSON} fItem is a wrapper for the forecast data
 * returned by our call to the nation weather service endpoint
 * @returns {string} an html string to set as dynamic content
 */
function buildDynamicWeatherFull(fItem) {
	var formattedDate = new Date(fItem.startTime);
	var windDirection = getWeatherDirectionUnicode(fItem.windDirection);
	var elem = `<div class="weather-item-full">
					<p>${fItem.name} ${formattedDate.getMonth() + 1}/${formattedDate.getDate()}</p>
					<p>${fItem.shortForecast}</p>
					<img src="${fItem.icon}" alt="weather icon ${fItem.number}">
					<p>Feels Like ${fItem.temperature} &#186;${fItem.temperatureUnit}</p>
					<p>Wind ${fItem.windSpeed} ${windDirection}</p>
				</div>`;
	return elem;
}