var express = require('express');
var router = express.Router();
const Mopidy = require('mopidy');

const mopidy = new Mopidy({
	webSocketUrl : 'ws://192.168.140.99:6680/mopidy/ws'
});

var currentTime = 0, totalTime, paused = false, intervalfn;

mopidy.on('event:trackPlaybackStarted', () => {
	mopidy.playback.getCurrentTrack().then((track) => {
		if (intervalfn) clearInterval(intervalfn);
			totalTime = parseInt(track.length / 1000);
			currentTime = 0;
			intervalfn = setInterval(function() {
			if (!paused) {
				currentTime++;
			}
	    }, 1000);
	});
});
mopidy.on('event:trackPlaybackResumed', () => {
	paused = false;
});
mopidy.on('event:trackPlaybackPaused', () => {
	paused = true;
});

// render home page
router.get('/', (req, res, next) => {
  if (req.session.success) {
    res.render('index', {title: 'Mavboard'});
  } else {
    res.render('login', { errors: req.session.errors });
    req.session.errors = null;
	}
});
router.get('/currentTime', (req, res, next) => {
	var data = JSON.stringify({
		curr: currentTime,
		total: totalTime
	});
	res.send(data);
});

router.get('/login', function(req, res){
  res.render('login', { errors: req.session.errors });
  req.session.errors = null;
});

router.post('/login', function(req, res) {
  let name = req.body.name;
  //req.checkBody('name', 'Name is required').notEmpty();
  const errors = false;
  if(errors){
    req.session.errors = errors;
    res.redirect('/login');
  }
  else{
    req.session.success = true;
    res.redirect('/');
  }

});
module.exports = router;
