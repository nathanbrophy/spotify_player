/**
 * @author Nathan
 *
 * File used for modulating the search logic for searching spotify for the query.
 */

/**
 * Function to seach spotify for the given query.  The query comes from what the user enters
 * into the search bar on the dynamic page.
 *
 * @param {Event} e is the event passed in through the search being submitted
 */
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

/**
 * Function to play the track a user selects from the search menu.
 * Can either play right now or play next.
 *
 * @param {DOMNode} elem is the search item html wrapper clicked on
 * @param {boolean} next if true then play song next, if false then immediately play the song
 */
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
/**
 * Add the searched for track to the spotify track queue (at the end)
 */
function addTrackToQueue(elem) {
	var id = elem.id;
	var uriId = id.replace('addqueue','uri');

	var _uri = document.getElementById(uriId).innerHTML;
	window.music.mopidy.tracklist.getLength().then((len) => {
		window.music.mopidy.tracklist.add(null, len, _uri);
	});
}
/**
 * Copy the searched for track URI to the clipboard
 */
function copyTrackURI(elem) {
	// the input item is hidden off the screen, so we can use it for clipboard copying.
	var id = elem.id;
	var uriId = id.replace('copyuri','uri');

	var _uri = document.getElementById(uriId).innerHTML;

	var input = document.getElementById('copy-to-ckipboard');
	input.value = _uri;

	input.select();
	document.execCommand("copy");
}