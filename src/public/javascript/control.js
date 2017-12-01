'use strict';

const setupSpotifyButtons = () => {
  console.log("called");
  document.getElementById('sptPlayBtn').addEventListener('click', () => {window.music.sptPlay();});
  document.getElementById('sptPauseBtn').addEventListener('click', () => {window.music.sptPause();});
  document.getElementById('sptPrevBtn').addEventListener('click', () => {window.music.sptPreviousTrack();});
  document.getElementById('sptNextBtn').addEventListener('click', () => {window.music.sptNextTrack();});
  document.getElementById('mopidy').style.display = 'block';
}

if (window.music) {
  setupSpotifyButtons();
} else {
  document.getElementById('mopidy').addEventListener('spotifyready', () => {
    setupSpotifyButtons();
  });
}
