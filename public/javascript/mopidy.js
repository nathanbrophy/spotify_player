'use strict';

const Mopidy = require('mopidy');

const rpcURL = 'http://192.168.140.125:6680/mopidy/rpc'
const wsURL = 'ws://192.168.140.125:6680/mopidy/ws';

const callMopidyWS = () => {
  console.log('Calling WebSocket API directly');

  var http = new XMLHttpRequest();
  var response = "";
  http.onload = () => {
    console.log("Onload fire");
  };
  http.onerror = () => {
    console.log("Onerror fire");
  };
  http.onreadystatechange = () => {
    if (this.readyState == 4 && this.status == 200) {
      response = http.responseXML;
    }
  };
  http.open("POST", rpcURL, true);
  http.send('{"jsonrpc": "2.0"}');

  console.log(response);
}

const callMopidyJS = () => {
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
  mopidy.on(console.log.bind(console));

  // wait for mopidy server to be online and responsive
  mopidy.on('state:online', () => {
    console.log('mopidy is online');

    // print out the current track (returns a promise)
    mopidy.playback.getCurrentTrack()
      .done((track) => {
        if (track) {
          console.log(`Currently playing ${track.name} by ${track.artists[0].name}`);
        } else {
          console.log('No track currently playing');
        }
      }).catch((e) => {
        console.error(e);
      });
  });
}
