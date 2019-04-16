'use strict';

var trackNum = 0;
function generateList() {
	window.music.mopidy.tracklist.getTracks().then(tracks => {
		var container = document.getElementById('spotify-interative-list-container').querySelector('ul');
		container.innerHTML = "";
		for (var i = 0; i < tracks.length; i++) {
			var _i = new interactiveListItem(tracks[i]);
			_i.appendToContainer(container);
		}
	});
	console.log(window.music.mopidy);
}

function volumeChanged(elem) {
	window.music.mopidy.mixer.setVolume(parseInt(elem.value));
}

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

function toggleConsume(elem) {
	window.music.mopidy.tracklist.getConsume().then(state => window.music.mopidy.tracklist.setConsume(!state));
}

function ilistDrag(e) {
	e.dataTransfer.setData("text", e.target.id);
}

function ilistDropDelete(e) {
	e.preventDefault();

	var draggedData = e.dataTransfer.getData("text");
	var elem = document.getElementById(draggedData);
	var uri = elem.querySelector(".ilist-track-uri").innerHTML;
	window.music.mopidy.tracklist.remove({ 'uri': [uri] });
	elem.remove();
}

function ilistAllowDrop(e) {
	e.preventDefault();
}

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