/**
 * File name: app.js
 * Student name: Shedrach Okonofua
 * Student ID: 300881481
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
