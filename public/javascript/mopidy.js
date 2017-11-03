'use strict';

const callMopidy = () => {
  console.log("Mopidy Test")

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
  http.open("POST", "http://192.168.140.125:6680/mopidy/rpc", true);
  http.send('{"jsonrpc": "2.0"}');

  console.log(response);
}
