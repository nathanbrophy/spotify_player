function searchSpotify(e) {
	e.preventDefault();
	var container = document.getElementById('search-results-list');
	var searchFor = document.getElementById('query').value;
	window.music.mopidy.library.search({'any': searchFor}).then((res) => {
		var results;
		for (var i = 0; i < res.length; i++) {
			if (res[i].tracks) {
				results = res[i];
			}
		}
		var tracks = results.tracks;
		container.innerHTML = '';
		for (var i = 0; i < tracks.length; i++) {
			var track = tracks[i];
			var elem = document.createElement('li');
			elem.classList.add('interactive-track-item');
			elem.innerHTML = `<div class="ilist-row0 search-result">
								<p class="ilist-track-name">${track.name}</p>
							  	<p class="ilist-track-uri" style="display:none;" id='uri?${i}'>${track.uri}</p>
							  	<a class='search-item-options' id='play?${i}' onclick='playTrack(this, false)'>Play</a>
							  	<a class='search-item-options' id='playnext?${i}' onclick='playTrack(this, true)'>Play Next</a>
							  	<a class='search-item-options' id='addqueue?${i}' onclick='addTrackToQueue(this)'>Add to Queue</a>
							  	<a class='search-item-options' id='copyuri?${i}' onclick='copyTrackURI(this)'>Copy URI</a>
							  </div>
							  <div class="ilist-row1 search-result">
								  <p class="ilist-track-artist">${track.artists[0].name}</p>
								  <p>|</p>
								  <p class="ilist-track-album">${track.album.name}</p>
							  </div>`;
			elem.id = 'track-list-item-' + i;
			container.appendChild(elem);
		}		
	});
}

function playTrack(elem, next) {
	var id = elem.id;
	var uriId = next ? id.replace('playnext','uri') : id.replace('play','uri');

	var _uri = document.getElementById(uriId).innerHTML;

	window.music.mopidy.tracklist.add(null, 1, _uri);
	if (!next) {
		window.music.mopidy.playback.next();
		window.music.mopidy.play();
	}
}
function addTrackToQueue(elem) {
	var id = elem.id;
	var uriId = id.replace('addqueue','uri');

	var _uri = document.getElementById(uriId).innerHTML;
	window.music.mopidy.tracklist.getLength().then((len) => {
		window.music.mopidy.tracklist.add(null, len, _uri);
	});
}
function copyTrackURI(elem) {
	var id = elem.id;
	var uriId = id.replace('copyuri','uri');

	var _uri = document.getElementById(uriId).innerHTML;

	var input = document.getElementById('copy-to-ckipboard');
	input.value = _uri;

	input.select();
	document.execCommand("copy");
}