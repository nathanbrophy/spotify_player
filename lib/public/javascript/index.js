'use strict';

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
}

function toggleSpotifyDiv() {
		var containerAlbumArt = document.getElementById("spotify-info-container");
		var containerList = document.getElementById("spotify-interative-list-container");

		var listDisplayed = containerList.classList.contains("active");
		if (!listDisplayed) {
				containerAlbumArt.classList.remove("active");
				containerAlbumArt.classList.add("hidden");

				containerList.classList.remove("hidden");
				containerList.classList.add("active");

				document.getElementById('toggle-list-link').innerHTML = "Toggle Album Info";
		} else {
				containerAlbumArt.classList.remove("hidden");
				containerAlbumArt.classList.add("active");

				containerList.classList.remove("active");
				containerList.classList.add("hidden");

				document.getElementById('toggle-list-link').innerHTML = "Toggle List";
		}
		generateList();
}