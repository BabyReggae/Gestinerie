const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
var mysql = require('mysql');
var randtoken = require('rand-token');
var nodemailer = require('nodemailer');
var DeviceDetector = require('device-detector-js');

const tokenDuration = 30;/* days nb before token expiration */ 




// parse requests of content-type: application/json
router.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));
router.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});



var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bobbles_v0'
});

//////////////////////////////////////////////////////// =>


router.get('/', (req,res) => {
	res.send('customers');
});




module.exports = router;