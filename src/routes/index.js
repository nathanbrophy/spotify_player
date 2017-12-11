var express = require('express');
var router = express.Router();

// render home page
router.get('/', (req, res, next) => {
  res.render('index', {title: 'Mavboard'});
});

module.exports = router;
