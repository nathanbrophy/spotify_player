'use strict';

var express = require('express');
var router = express.Router();

// render home page
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Mavboard' });
});

// render control page
router.get('/control', (req, res, next) => {
  res.render('control', { title: 'Mavboard Control Panel' });
});

module.exports = router;