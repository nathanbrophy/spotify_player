'use strict';

const setupSpotifyButtons = () => {
  document.querySelector('#sptPlayBtn').addEventListener('click', () => {music.sptPlay();});
  document.querySelector('#sptPauseBtn').addEventListener('click', () => {music.sptPause();});
  document.querySelector('#sptPrvBtn').addEventListener('click', () => {music.sptPreviousTrack();});
  document.querySelector('#sptNextBtn').addEventListener('click', () => {music.sptNextTrack();});
  spotDiv.style.display = 'block';
}

const spotDiv = document.querySelector('.spotify');
console.log("Spotdiv");
console.log(spotDiv);
spotDiv.addEventListener('spotifyready', (evt) => {
  console.log("Catching event: ");
  console.log(evt)
  setupSpotifyButtons();
  // mopdiv.addEventListener('songchange' () => {
  //   updateSongInfo();
  // });
});
