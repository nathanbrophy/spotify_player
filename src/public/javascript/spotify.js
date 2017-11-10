// @flow

'use strict';

// maverick pi
const rpcURL = 'http://192.168.140.125:6680/mopidy/rpc';
const wsURL = 'ws://192.168.140.125:6680/mopidy/ws';

// jade's pi
// const rpcURL: string = 'http://192.168.2.61:6680/mopidy/rpc';
// const wsURL: string = 'ws://192.168.2.61:6680/mopidy/ws';
var m;
const callMopidy = (): void => {
  console.log('Calling WS API through JS wrapper');

  // create and auto-connect to mopidy web socket
  const mopidy = new Mopidy({
    autoConnect: true,
    webSocketUrl: wsURL,
    callingConvention: 'by-position-or-by-name'
  });

  // Now we have these api objects to play with:
  // mopidy.playback
  // mopidy.tracklist
  // mopidy.playlists
  // mopidy.library

  // each method in these objects have params and descripton properties which will display information about what the
  //   underlying Python function is and expects.

  // log all events to console
  // mopidy.on(console.log.bind(console));

  // wait for mopidy server to be online and responsive
  mopidy.on('state:online', (): void => {
    console.log('mopidy is online');

    // print out the current track (returns a promise)
    mopidy.playback.getCurrentTrack()
      .then((track: {[string]: any}): void => {
        if (track) {
          console.log(`Currently playing ${track.name} by ${track.artists[0].name}`);
        } else {
          console.log('No track currently playing');
        }
      }).catch((e: any): void => {
        console.error(e);
      });
  });

  // make mopidy available from the console for API exploration
  m = mopidy;
}


/* TEST */
// callMopidy();
