'use strict';

/**
 * @author Nathan
 *
 * This file is responsible for generating the interactive list for the
 * currently playing song track list.
 */
var trackNum = 0; // Keep record of how many tracks we have
/**
 * Generate the actual list of items for the display
 */
function generateList() {
	window.music.mopidy.tracklist.getTracks().then(tracks => {
		var container = document.getElementById('spotify-interative-list-container').querySelector('ul');
		container.innerHTML = "";
		for (var i = 0; i < tracks.length; i++) {
			var _i = new interactiveListItem(tracks[i]);
			_i.appendToContainer(container);
		}
	});
}

/**
 * Whenever the user changes the volue via the slide
 * bar, we make a call to mopidy to change the volume.
 *
 * @param {DOMElem [type=slider]} elem is the slider we pull the volume value from
 */
function volumeChanged(elem) {
	window.music.mopidy.mixer.setVolume(parseInt(elem.value));
}
/**
 * When user clicks the lower mic we toggle the mute on/off for the music
 *
 * @param {DOMNode} elem is the node we are toggling the image glyph icon for.
 */
function toggleMute(elem) {
	if (elem.id == "volume-down") {
		document.getElementById('volume-mute').style.display = 'block';
		elem.style.display = 'none';
		document.getElementById('music-volume-control').disabled = true;
		window.music.mopidy.mixer.setMute(true);
	} else {
		document.getElementById('volume-down').style.display = 'block';
		elem.style.display = 'none';
		document.getElementById('music-volume-control').disabled = false;
		window.music.mopidy.mixer.setMute(false);
	}
}
/**
 * When user clicks the fork and knife we toggle the consume on/off for the music
 *
 * @param {DOMNode} elem is the node we are toggling the image glyph icon for.
 */
function toggleConsume(elem) {
	window.music.mopidy.tracklist.getConsume().then(state => window.music.mopidy.tracklist.setConsume(!state));
}

/**
 * Drag function for the ilist item
 */
function ilistDrag(e) {
	e.dataTransfer.setData("text", e.target.id);
}
/**
 * When we drop the item on the trash can icon, delete that track from the tracklist.
 */
function ilistDropDelete(e) {
	e.preventDefault();

	var draggedData = e.dataTransfer.getData("text");
	var elem = document.getElementById(draggedData);
	var uri = elem.querySelector(".ilist-track-uri").innerHTML;
	window.music.mopidy.tracklist.remove({ 'uri': [uri] });
	elem.remove();
}
/**
 * Pass
 */
function ilistAllowDrop(e) {
	e.preventDefault();
}

/**
 * Class wrapper for the interactive list items we show the user.
 *
 * @param track is the track object we are wrapping into the list
 *
 * @member {string} trackName is the name of the track
 * @member {string} trackLength is a formatted length of the trak M:SS
 * @member {string} album is the track album
 * @member {string} atrist is the song's artist
 * @member {string} uri is the absolute spotify path location for the track
 */
var interactiveListItem = function (track) {
	trackNum++;
	var _length = track.length;
	var minutes = parseInt(_length / 60000);
	_length = _length - minutes * 60000;
	var seconds = parseInt(_length / 1000);
	if (seconds < 10) seconds = "0" + seconds;
	this.trackName = track.name;
	this.trackLength = `${minutes}:${seconds}`;
	this.album = track.album.name;
	this.artist = track.artists[0].name;
	this.uri = track.uri;
};

/**
 * Method to add the given tracklist item to a container
 *
 * @param {DOMNode} container is the html dom node we want to put the list into
 */
interactiveListItem.prototype.appendToContainer = function (container) {
	var elem = document.createElement('li');
	elem.classList.add('interactive-track-item');
	elem.innerHTML = `<div class="ilist-row0">
						<p class="ilist-track-name">${this.trackName}</p>
					  	<p class="ilist-track-length">${this.trackLength}</p>
					  	<p class="ilist-track-uri" style="display:none;">${this.uri}</p>
					  </div>
					  <div class="ilist-row1">
						  <p class="ilist-track-artist">${this.artist}</p>
						  <p>|</p>
						  <p class="ilist-track-album">${this.album}</p>
					  </div>`;
	elem.draggable = true;
	elem.ondragstart = ilistDrag;
	elem.id = `interactive-track-item-${trackNum}`;
	container.appendChild(elem);
};