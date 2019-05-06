'use strict';
/**
 * @Author Nathan
 *
 * File is used as the main JS for the index page
 */
var containers;  // Makes switching between dynamic content pages easier
/**
 * Function to initialize all the dynamic content for the page
 */
function displayDynamicContent() {
	window.playlist = false;
	var originalHeight, originalwidth;
	$('#prev-track-image-1').hover(function() {
		var elem = $(this)[0];
		originalHeight = elem.getAttribute('height');
		originalwidth = elem.getAttribute('width');
		$(this).css({
			'z-index': '999',
			'opacity': '1'
		});
		$(this).animate({
			'height': '+=100px',
			'width': '+=100px'
		}, 'slow');
	}, function() {
		$(this).css({
			'z-index': '2',
			'opacity': '.9'
		});
		$(this).animate({
			'height': originalHeight,
			'width': originalwidth
		}, 'slow');
	});
	$('#prev-track-image-2').hover(function() {
		var elem = $(this)[0];
		originalHeight = elem.getAttribute('height');
		originalwidth = elem.getAttribute('width');
		$(this).css({
			'z-index': '999',
			'opacity': '1'
		});
		$(this).animate({
			'height': '+=150px',
			'width': '+=150px'
		}, 'slow');
	}, function() {
		$(this).css({
			'z-index': '1',
			'opacity': '.65'
		});
		$(this).animate({
			'height': originalHeight,
			'width': originalwidth 
		}, 'slow');
	});

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
/**
 * Function to toggle between the pages [album, search, list]
 *
 * @param {string} page is the dynamic page we want to display
 */
function toggleDynamicPages(page) {
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
/**
 * Toggle the search page display
 */
function toggleSearch() {
	toggleDynamicPages('search');
}
/**
 * Toggle the spotify album / list dispaly
 */
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
/**
 * Keep color field data in range [0,255]
 *
 * @param {number} c is the color field 
 */
function clamp(c) {
	var clamped = c;
	if (c > 255) clamped = 255;
	if (c < 0) clamped = 0;
	return clamped;
}
/**
 * When the dynamic background is chosen, this function changes
 * the color gradient background whenever the album cover changes.
 *
 * @param {DOMNode} elem is the image element in the page
 */
function changeBgGradient(elem) {
	// elem.src = '/imgs/the-beatles-the-white-album.png';
	if (!document.getElementById('dynamic-theme').classList.contains('current-theme')) {
		return false;
	}
	// Create a canvas element so we can get color information about the photo
	var c = document.createElement('canvas');
	c.width = elem.width;
	c.height = elem.height;
	var context = c.getContext('2d');
	context.drawImage(elem, 0, 0, elem.width, elem.height);
	var averageColors = [0,0,0];
	var hits = 0;
	var data = context.getImageData(0, 0, elem.width, elem.height).data;
	// step += 4 because the alpha channel is included in the color data
	for (var d = 0; d < data.length-4; d+=4) {
		averageColors[0] += data[d];
		averageColors[1] += data[d+1];
		averageColors[2] += data[d+2];
		hits++;
	}
	averageColors[0] = parseInt(averageColors[0] / hits);
	averageColors[1] = parseInt(averageColors[1] / hits);
	averageColors[2] = parseInt(averageColors[2] / hits);
	var r1 = clamp(averageColors[0] + 68); 
	var g1 = clamp(averageColors[1]);
	var b1 = clamp(averageColors[2] - 78);

	var r2 = clamp(averageColors[0] - 68);
	var g2 = clamp(averageColors[1]);
	var b2 = clamp(averageColors[2] + 78);

	/*
	 * Logic for determining the brightness of the background adapted and
	 * extended from:
	 * https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
	 */
	var brightness1 = Math.round(((r1 * 299) +
                      (g1 * 587) +
                      (b1 * 114)) / 1000);
	var brightness2 = Math.round(((r2 * 299) +
                      (g2 * 587) +
                      (b2 * 114)) / 1000);
	/*
	 * End logic taken from https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
	 */
	var bAvg = (brightness1 + brightness2) / 2;
	// Sometimes the background can get too light, so we change the text colors to be more visible
	if (bAvg > 125) {
		document.body.style.setProperty('--main-text-color', '#21262C');
		document.body.style.setProperty('--main-border-color', '#7D0B65');
		document.body.style.setProperty('--main-anchor-color', '#7D0B65');
		document.body.style.setProperty('--main-timebar-background', '#cdcdcd');
		document.body.style.setProperty('--main-timebar', '#7D0B65');
		document.body.style.setProperty('--main-consume-off', '21262C');
	}
	else {
		document.body.style.setProperty('--main-text-color', 'white');
		document.body.style.setProperty('--main-border-color', '#41f468');
		document.body.style.setProperty('--main-anchor-color', '#41f468');
		document.body.style.setProperty('--main-timebar-background', '#aaaaaa');
		document.body.style.setProperty('--main-timebar', '#ffffff');
		document.body.style.setProperty('--main-consume-off', 'white');
	}
	var rgb1 = `rgb(${r1}, ${g1}, ${b1})`;
	var rgb2 = `rgb(${r2}, ${g2}, ${b2})`;
	var bg = `linear-gradient(-45deg, ${rgb1}, ${rgb2})`;
	document.body.style.background = bg;
	// document.body.style.backgroundSize = '200% 200%';
	return true;
}

/**
 * If Themes link is clicked, then show all the themes, if
 * cancel is clicked, Themes link is showed instead.
 */
function toggleThemePicker(show) {
	var themes = document.getElementById('theme-picker');
	var toggle = document.getElementById('theme-div-toggle');
	if (show) {
		themes.classList.remove('hidden');
		themes.classList.add("active");
		toggle.classList.remove('active');
		toggle.classList.add('hidden');
	}
	else {
		toggle.classList.remove('hidden');
		toggle.classList.add("active");
		themes.classList.remove('active');
		themes.classList.add('hidden');
	}
}