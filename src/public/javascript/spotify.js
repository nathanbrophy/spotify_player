// @flow

'use strict';

// we have access to:
// mopidy.playback
// mopidy.tracklist
// mopidy.playlists
// mopidy.library

class SpotifyController {
  rpcURL: string;
  wsURL: string;
  mopidy: Mopidy;
  online: boolean;
  state: {
    online: boolean,
    currentTrack: {},
    nextTrack: {},
    previousTrack: {},
  };

  constructor(): void {
    // maverick pi
    this.rpcURL = 'http://192.168.140.99:6680/mopidy/rpc';
    this.wsURL = 'ws://192.168.140.99:6680/mopidy/ws';

    // jade pi
    // this.rpcURL = 'http://192.168.2.61:6680/mopidy/rpc';
    // this.wsURL = 'ws://192.168.2.61:6680/mopidy/ws';

    // establish Mopidy API connection
    this.initMopidy().then((m) => {
      this.mopidy = m;
      const evt: Event = new Event('spotifyready');
      const spotifyDiv: any = document.querySelector('.spotify');
      if (spotifyDiv) {
        spotifyDiv.dispatchEvent(evt);
      } else {
        console.error('Unable to bind to mopdiy div');
      }
    });

    // TODO: this needs to be optimized for V8 or we will end up with a slow but stedy memory leak as new hidden classes are created
    this.state = {
      online: false,
      currentTrack: {},
      nextTracks: {},
      previousTrack: {},
    }
  }

  initMopidy(): Mopidy {
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
          mopidy.playback.getCurrentTrack().then((track) => {
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

  sptPlay(): void {
    if (this.state.online) {
      this.mopidy.playback.play();
    }
  }

  sptPause(): void {
    if (this.state.online) {
      this.mopidy.playback.pause();
    }
  }

  sptPreviousTrack(): void {
    if (this.state.online) {
      this.mopidy.playback.previous();
    }
  }

  sptNextTrack(): void {
    if (this.state.online) {
      this.mopidy.playback.next();
    }
  }

  syncState(evt): void {
    console.log(evt);
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
      case 'event:trackPlaybackStarted':
        window.music.mopidy.playback.getCurrentTrack().then((track) => {
          document.querySelector('p.currSong').innerHTML = '' + track.name + ' -- ' + track.artists[0].name;
        });
        break;

      // Ensure volumn stays bearable
      case 'event:volumeChanged':
        console.log("Volume changed");
        break;

      case 'event:tracklistChanged':
        console.log("");
        break;

      default:
        // console.log(evt);
        break;
    }
  }
}

// make controller available globally as window.music
window.music = new SpotifyController();
