'use strict';

// we have access to:
// mopidy.playback
// mopidy.tracklist
// mopidy.playlists
// mopidy.library

class SpotifyController {

  constructor() {
    // maverick pi
    this.rpcURL = 'http://192.168.140.125:6680/mopidy/rpc';
    this.wsURL = 'ws://192.168.140.125:6680/mopidy/ws';

    // jade pi
    // this.rpcURL = 'http://192.168.2.61:6680/mopidy/rpc';
    // this.wsURL = 'ws://192.168.2.61:6680/mopidy/ws';

    // establish Mopidy API connection
    this.initMopidy().then(m => {
      this.mopidy = m;
      const evt = new Event('spotifyready');
      const spotifyDiv = document.querySelector('.spotify');
      if (spotifyDiv) {
        console.log("Dispatching event");
        spotifyDiv.dispatchEvent(evt);
        console.log("Event was dispatched");
      } else {
        console.error('Unable to bind to mopdiy div');
      }
    });

    // TODO: this needs to be optimized for V8 or we will end up with a slow but stedy memory leak as new hidden classes are created
    this.state = {
      online: false,
      currentTrack: {},
      nextTrack: {},
      previousTrack: {}
    };
  }

  initMopidy() {
    return new Promise((resolve, reject) => {
      const mopidy = new Mopidy({
        autoConnect: true,
        webSocketUrl: this.wsURL,
        callingConvention: 'by-position-or-by-name'
      });

      // register syncState as general event listener
      mopidy.on(this.syncState);

      try {
        // manually set current state
        // after this, syncState will handle updating
        mopidy.on('state:online', () => {
          this.state.online = true;
          mopidy.playback.getCurrentTrack().then(track => {
            this.state.currentTrack = track;
            if (this.state.currentTrack) {
              console.log(`Currently playing ${this.state.currentTrack.name} by ${this.state.currentTrack.artists[0].name}`);
            } else {
              console.log('No track currently playing');
            }
          });
          resolve(mopidy);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  sptPlay() {
    if (this.state.online) {
      this.mopidy.playback.play();
    }
  }

  sptPause() {
    if (this.state.online) {
      this.mopidy.playback.pause();
    }
  }

  sptPreviousTrack() {
    if (this.state.online) {
      this.mopidy.playback.previous();
    }
  }

  sptNextTrack() {
    if (this.state.online) {
      this.mopidy.playback.next();
    }
  }

  syncState(evt) {
    switch (evt) {
      case 'state:online':
        window.music.state.online = true;
        break;
      case 'state:offline':

      // TODO default to connecting first, then wait for connection
      case 'reconnectionPending':
      case 'reconnecting':
        window.music.state.online = false;
        break;

      // TODO on song change, emit event so text can be updated

      default:
        // console.log(evt);
        break;
    }
  }
}

// make controller available globally as window.music
window.music = new SpotifyController();