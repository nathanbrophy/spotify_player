function displayWeather() {
	var x = new XMLHttpRequest();

	x.onreadystatechange = function() {
		if (x.readyState == 4 && x.status == 200) {
			var content = `<h3 id="weather-info-header">Weather Info</h3>`

			const data = JSON.parse(x.responseText);
			const forecast = data.properties.periods;

			content += buildDynamicWeatherFull(forecast[0]);

			document.getElementById('weather-wrapper').innerHTML = content;
			var marqueeSpan = "";
			for (var i = 1; i < forecast.length; i++) {
				marqueeSpan += buildDynamicWeather(forecast[i]);
			}	
			var marquee = `<div class="marquee"><div>
								<span>${marqueeSpan}</span>
								<span>${marqueeSpan}</span>
							</div></div>`;	

			document.getElementById('7-day-forecast').innerHTML = marquee;	
		}
		else {
			console.log(`Errored on ready state ${x.readyState} with status code ${x.status}`);
		}
	}

	// x.open('GET','https://api.weather.gov/points/44.973385,-93.246857', true);
	x.open('GET', 'https://api.weather.gov/gridpoints/MPX/108,71/forecast', true);
	x.send();
}

function buildDynamicWeather(fItem) {
	var formattedDate = new Date(fItem.startTime);
	var windDirection = getWeatherDirectionUnicode(fItem.windDirection);
	var elem = `${fItem.name} ${formattedDate.getDate()}/${formattedDate.getMonth()} ${fItem.shortForecast} Feels Like ${fItem.temperature} &#186;${fItem.temperatureUnit} Wind ${fItem.windSpeed} ${windDirection} | `;
	return elem;
}

function getWeatherDirectionUnicode(d) {
	var windDirection = "";
	switch(d) {
		case "N":
			windDirection = "&uarr;";
			break;
		case "NW":
			windDirection = "&#8598;";
			break;
		case "NE":
			windDirection = "&#8599;";
			break;
		case "S":
			windDirection = "&darr;";
			break;
		case "SW":
			windDirection = "&#8601;";
			break;
		case "SE":
			windDirection = "&#8600;";
			break;
		case "E":
			windDirection = "&rarr;";
			break;
		case "W":
			windDirection = "&larr;";
			break;
		default:
			windDirection = "";
	}
	return windDirection;
}

function buildDynamicWeatherFull(fItem) {
	var formattedDate = new Date(fItem.startTime);
	var windDirection = getWeatherDirectionUnicode(fItem.windDirection);
	var elem = `<div class="weather-item-full">
					<p>${fItem.name} ${formattedDate.getDate()}/${formattedDate.getMonth()}</p>
					<p>${fItem.shortForecast}</p>
					<img src="${fItem.icon}" alt="weather icon ${fItem.number}">
					<p>Feels Like ${fItem.temperature} &#186;${fItem.temperatureUnit}</p>
					<p>Temperature is ${fItem.temperatureTrend}</p>
					<p>Wind ${fItem.windSpeed} ${windDirection}</p>
				</div>`;
	return elem;
}