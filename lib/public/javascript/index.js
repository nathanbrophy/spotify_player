'use strict';

var containers;
const setupSpotifyButtons = () => {
	document.querySelector('#sptPlayBtn').addEventListener('click', () => {
		music.sptPlay();
	});
	document.querySelector('#sptPauseBtn').addEventListener('click', () => {
		music.sptPause();
	});
	document.querySelector('#sptPrvBtn').addEventListener('click', () => {
		music.sptPreviousTrack();
	});
	document.querySelector('#sptNextBtn').addEventListener('click', () => {
		music.sptNextTrack();
	});
	spotDiv.style.display = 'block';
};

function displayDynamicContent() {
	displayAllTimes();
	displayWeather();

	containers = [{
		name: 'album',
		container: document.getElementById("spotify-info-container")
	}, {
		name: 'ilist',
		container: document.getElementById("spotify-interative-list-container")
	}, {
		name: 'search',
		container: document.getElementById('spotify-search-container')
	}];
}
function toggleDynamicPages(page) {
	console.log(containers);
	for (var i = 0; i < containers.length; i++) {
		var curr = containers[i];
		if (page == curr.name) {
			curr.container.classList.remove('hidden');
			curr.container.classList.add('active');
		} else {
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
	} else {
		toggleDynamicPages('album');

		document.getElementById('toggle-list-link').innerHTML = "Toggle List";
	}
	generateList();
}

function changeTheme(theme) {
	var link = document.getElementById('theme');
	var url = '/stylesheets/' + theme + "_theme.css";
	link.href = url;

	var _ctheme = document.getElementById('colorful-theme');
	var _itheme = document.getElementById('light-theme');
	var _dtheme = document.getElementById('dark-theme');
	switch (theme) {
		case 'colorful':
			_ctheme.classList.add('current-theme');
			_itheme.classList.remove('current-theme');
			_dtheme.classList.remove('current-theme');
			break;
		case 'dark':
			_dtheme.classList.add('current-theme');
			_itheme.classList.remove('current-theme');
			_ctheme.classList.remove('current-theme');
			break;
		default:
			_itheme.classList.add('current-theme');
			_ctheme.classList.remove('current-theme');
			_dtheme.classList.remove('current-theme');
	}
}