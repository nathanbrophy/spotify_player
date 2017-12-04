'use strict';

const mopdiv = document.querySelector('.mopidy');

const setupSpotifyButtons = () => {
  document.querySelector('.sptPlayBtn').addEventListener('click', () => {music.sptPlay();});
  document.querySelector('.sptPauseBtn').addEventListener('click', () => {music.sptPause();});
  document.querySelector('.sptPrevBtn').addEventListener('click', () => {music.sptPreviousTrack();});
  document.querySelector('.sptNextBtn').addEventListener('click', () => {music.sptNextTrack();});
  mopdiv.style.display = 'block';
}

mopdiv.addEventListener('spotifyready', () => {
  setupSpotifyButtons();
  // mopdiv.addEventListener('songchange' () => {
  //   updateSongInfo();
  // });
});
