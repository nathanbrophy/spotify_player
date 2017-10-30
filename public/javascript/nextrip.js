function loadBusTimes() {
  console.log("test")

  var http = new XMLHttpRequest();
  var response = "";
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      response = http.responseXML;
    }
  };
  http.open("GET", "http://svc.metrotransit.org/NexTrip/13223", false);
  http.send();

  var x = response.getElementsByTagName("NexTripDeparture");
  var bus = document.getElementById("bus");
  var busTimes = "Next Bus At: ";

  for (var i = 0; i < 5; i++) {
    busTimes = busTimes + x[i].getElementsByTagName("DepartureText")[0].innerHTML + ", ";
    bus.innerHTML = busTimes;
  }
}
