'use strict';

var containers;
function displayDynamicContent() {
	window.playlist = false;
	displayAllTimes();
	displayWeather();

	containers = [
					{
						name : 'album',
						container : document.getElementById("spotify-info-container")
					},
					{
						name: 'ilist',
						container  : document.getElementById("spotify-interative-list-container")
					},
					{
						name: 'search',
						container : document.getElementById('spotify-search-container')
					}
				 ];
}
function toggleDynamicPages(page) {
	console.log(containers);
	for (var i = 0; i < containers.length; i++) {
		var curr = containers[i];
		if (page == curr.name) {
			curr.container.classList.remove('hidden');
			curr.container.classList.add('active');
		}
		else {
			if (curr.container.classList.contains('active')) {
				curr.container.classList.remove('active');
				curr.container.classList.add('hidden');
			}
		}
	}
}

function toggleSearch() {
	toggleDynamicPages('search');
}

function toggleSpotifyDiv() {
	var containerAlbumArt = document.getElementById("spotify-info-container");
	var containerList = document.getElementById("spotify-interative-list-container");

	var listDisplayed = containerList.classList.contains("active");
	if (!listDisplayed) {
		toggleDynamicPages('ilist');

		document.getElementById('toggle-list-link').innerHTML = "Toggle Album Info";
	}
	else {
		toggleDynamicPages('album');

		document.getElementById('toggle-list-link').innerHTML = "Toggle List";
	}
	generateList();
}

function changeBgGradient(elem) {
	if (!document.getElementById('dynamic-theme').classList.contains('current-theme')) {
		return false;
	}
	var c = document.createElement('canvas');
	c.width = elem.width;
	c.height = elem.height;
	var context = c.getContext('2d');
	context.drawImage(elem, 0, 0, elem.width, elem.height);
	var averageColors = [0,0,0];
	var hits = 0;
	var data = context.getImageData(0, 0, elem.width, elem.height).data;
	for (var d = 0; d < data.length-4; d+=4) {
	averageColors[0] += data[d];
	averageColors[1] += data[d+1];
	averageColors[2] += data[d+2];
	hits++;
	}
	averageColors[0] = parseInt(averageColors[0] / hits);
	averageColors[1] = parseInt(averageColors[1] / hits);
	averageColors[2] = parseInt(averageColors[2] / hits);
	console.log(averageColors);
	var r1 = averageColors[0] + 68;
	if (r1 > 200) r1 = 200; 
	var g1 = averageColors[1];
	if (g1 > 200) gi = 200;
	var b1 = averageColors[2] - 78;
	if (b1 < 0) b1 = 0;

	var r2 = averageColors[0] - 68;
	if (r2 < 0) r2 = 0; 
	var g2 = averageColors[1];
	if (g2 > 200) g2 = 200;
	var b2 = averageColors[2] + 78;
	if (b2 > 200) b2 = 200;
	var rgb1 = `rgb(${r1}, ${g1}, ${b1})`;
	var rgb2 = `rgb(${r2}, ${g2}, ${b2})`;
	var bg = `linear-gradient(-45deg, ${rgb1}, ${rgb2})`;
	console.log(bg);
	document.body.style.background = bg;
	document.body.style.backgroundSize = '200% 200%';
	console.log(document.body.style.background);
	return true;
}