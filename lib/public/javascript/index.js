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

const spotDiv = document.querySelector('.spotify');
spotDiv.addEventListener('spotifyready', evt => {
  setupSpotifyButtons();
  // mopdiv.addEventListener('songchange' () => {
  //   updateSongInfo();
  // });
});