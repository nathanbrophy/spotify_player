'use strict';

let $ = id => {
  var ele = null;
  try {
    ele = document.getElementById(id);
  } catch (err) {
    console.log(err);
  }
  return ele;
};

let $$ = clas => {
  var ele = null;
  try {
    ele = document.getElementsByClassName(clas);
  } catch (err) {
    console.log(err);
  }
  return ele;
};

/**
 * start setInterval event to diplay
 * bus times on window load.
 * 
 * Note:
 *  add stop ids need to desplay in
 *  stopIDs array.
 */
let displayBusTimes = () => {
  var stopIDs = [13223];
  var container = $('bus');

  /*
  update no more less than every 30 sec.
  recommended by metrotransit.org web services
   */
  stopIDs.forEach(stopID => {
    loadTransitTimes(stopID, container);

    // Clears container content every time it fires
    setInterval(() => {
      container.innerHTML = '';loadTransitTimes(stopID, container);
    }, 35000);
  });
};

/**
 * start setInterval event to
 * diplay train times on window load
 * 
 * Note:
 *  add stop ids need to desplay in
 *  stopIDs array.
 */
let displayTrainTimes = () => {
  var stopIDs = [56001, 56042];
  var container = $('train');

  // update no more less than every 30 sec. recommended by metrotransit.org web services
  stopIDs.forEach(stopID => {
    loadTransitTimes(stopID, container);

    // Clears container content every time it fires
    setInterval(() => {
      container.innerHTML = '';loadTransitTimes(stopID, container);
    }, 35000);
  });
};

/**
 * Request NextTrip info for 'stopID'
 * and place the info in html element
 * 'container'.
 *
 * :param stopID: stop station id
 * :param container: html container element
 */
let loadTransitTimes = (stopID, container) => {

  console.log("test");
  var http = new XMLHttpRequest();

  http.onreadystatechange = () => {
    if (http.readyState == 4 && http.status == 200) {
      var uniqueRoute = [];

      var response = http.responseXML;
      var x = response.getElementsByTagName("NexTripDeparture");

      var content = '<div id="' + stopID + '">Stop ID: ' + stopID;
      for (var i = 0; i < x.length; i++) {
        var route = x[i].getElementsByTagName('Route')[0];
        route = route.innerHTML;

        if (!uniqueRoute.includes(route)) {
          content += createDepartureDiv(x[i]);

          uniqueRoute.push(route);
        }
      }
      content += '</div>';

      container.innerHTML += content;
    }
  };

  var url = "http://svc.metrotransit.org/NexTrip/" + stopID;
  http.open("GET", url, true);
  http.send();
};

/**
 * Creates div containing needed departure
 * info from passed in data.
 */
let createDepartureDiv = departure => {
  var div = '<div class="departure">';

  try {

    var depRouteArr = departure.getElementsByTagName('Route');
    var depDirArr = departure.getElementsByTagName('RouteDirection');
    var depTimeArr = departure.getElementsByTagName('DepartureText');
    var depDescArr = departure.getElementsByTagName('Description');

    var depRoute = depRouteArr != null ? depRouteArr[0].innerHTML : 'No Route';
    var depDir = depDirArr != null ? depDirArr[0].innerHTML : 'No Route Direction';
    var depTime = depTimeArr != null ? depTimeArr[0].innerHTML : 'No Departure Time';
    var depDesc = depDescArr != null ? depDescArr[0].innerHTML : 'No Description';

    div += '<span class="dep_trans">';
    div += depRoute + ' ';
    div += depDir;
    div += '</span><br>';

    div += '<span class="dep_desc">' + depDesc + '</span><br>';

    if (depTime.includes('Min')) {
      div += '<span class="dep_time">Next in: ' + depTime + ' </span>';
    } else {
      div += '<span class="dep_time">Next at: ' + depTime + '</span>';
    }
  } catch (err) {
    console.log(err);
  }

  div += '</div>';

  return div;
};

window.onload = () => {
  displayBusTimes();
  displayTrainTimes();
};