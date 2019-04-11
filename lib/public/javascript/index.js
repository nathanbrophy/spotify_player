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