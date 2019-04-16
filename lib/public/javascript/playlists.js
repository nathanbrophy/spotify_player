"use strict";

function displayDynamicContent() {
	window.playlist = true;
	console.log(window.music);
	console.log(window.music.state);
	window.music.mopidy.playlists.getPlaylists().then(res => {
		console.log(res);
	});
}