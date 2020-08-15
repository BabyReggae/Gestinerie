const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
// var mysql = require('mysql');
// var randtoken = require('rand-token');
// var nodemailer = require('nodemailer');
// var DeviceDetector = require('device-detector-js');

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



// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'bobbles_v0'
// });

//////////////////////////////////////////////////////// =>


router.get('/', (req,res) => {
	res.send('ask smtg to the customers api !');
});

router.get('/test', (req,res) => {
	res.send('yeah ');
});


router.get('/bacic_info?', (req,res) => {
	let token = req.query.token;
	if ( token == undefined ) res.send( "token non fourni" );

  let allCustomers = {
    0 : { id : 0 , name : "Jean", ville : "Lille", nbCmdOld : 7, nbCmdCurrent : 1, abonnement : "prenium" },
    1 : { id : 1 , name : "Silva", ville : "Lille", nbCmdOld : 7, nbCmdCurrent : 1, abonnement : "prenium" },
    2 : { id : 2 , name : "Jean", ville : "Lille", nbCmdOld : 7, nbCmdCurrent : 1, abonnement : "prenium" },
    3 : { id : 3 , name : "Jacques", ville : "Lille", nbCmdOld : 7, nbCmdCurrent : 1, abonnement : "standard" },
    4 : { id : 4 , name : "Jean", ville : "Santa-Cruz", nbCmdOld : 7, nbCmdCurrent : 1, abonnement : "prenium" },
    5 : { id : 5 , name : "Jean", ville : "Lille", nbCmdOld : 7, nbCmdCurrent : 1, abonnement : "prenium" },
  };


  res.json( allCustomers );

});



module.exports = router;