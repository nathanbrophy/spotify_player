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
    this.mopidy = this.initMopidy();

    // TODO: this needs to be optimized for V8 or we will end up with a slow but stedy memory leak as new hidden classes are created
    this.state = {
      online: false,
      currentTrack: {},
      nextTrack: {},
      previousTrack: {}
    };
  }

  initMopidy() {
    const mopidy = new Mopidy({
      autoConnect: true,
      webSocketUrl: this.wsURL,
      callingConvention: 'by-position-or-by-name'
    });

    // register syncState as general event listener
    mopidy.on(this.syncState);

    // manually set current state
    // after this, syncState will handle updating
    mopidy.on('state:online', () => {
      this.state.online = true;
      mopidy.playback.getCurrentTrack().then(track => {
        this.state.currentTrack = track;
        if (track) {
          console.log(`Currently playing ${track.name} by ${track.artists[0].name}`);
        } else {
          console.log('No track currently playing');
        }
      }).catch(e => {
        throw e;
      });
    });
  }

  isOnline() {
    return this.state.online;
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
      default:
        console.log(evt);
        break;
    }
  }
}

// make controller available globally as window.music
window.music = new SpotifyController();