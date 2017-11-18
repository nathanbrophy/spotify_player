'use strict';

const setupSpotifyButtons = (): void => {
  document.getElementById('sptPlayBtn').addEventListener('click', () => {window.music.sptPlay();});
  document.getElementById('sptPauseBtn').addEventListener('click', () => {window.music.sptPause();});
  document.getElementById('mopidy').style.display = 'block';
}

if (window.music) {
  setupSpotifyButtons();
} else {
  document.getElementById('mopidy').addEventListener('spotifyready', () => {
    setupSpotifyButtons();
  });
}
