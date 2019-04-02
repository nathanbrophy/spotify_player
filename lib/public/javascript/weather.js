"use strict";

function displayWeather() {
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			const data = JSON.parse(xmlHttp.responseText);
			console.log(data);
		}
	};

	xmlHttp.open("GET", "https://api.darksky.net/forecast/efa4d082d7c4dca72793e5e1769a3044/44.973384,-93.246859", true);
	xmlHttp.send();
}