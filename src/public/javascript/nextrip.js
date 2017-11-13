function loadBusTimes() {
  console.log("test")

  var http = new XMLHttpRequest();
  var response = "";
  http.onreadystatechange = () => {
    if (http.readyState == 4 && http.status == 200) {
      response = http.responseXML;
	  var x = response.getElementsByTagName("NexTripDeparture");
	  var bus = document.getElementById("bus");
	  var busTimes = "Next Bus At: ";

	  for (var i = 0; i < 5; i++) {
		busTimes = busTimes + x[i].getElementsByTagName("DepartureText")[0].innerHTML + ", ";
		bus.innerHTML = busTimes;
	  }
    }
  };
  
  http.open("GET", "http://svc.metrotransit.org/NexTrip/13223", true);
  http.send();
}
