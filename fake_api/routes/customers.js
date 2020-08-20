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
    0 : {
      "id": 1,
      "firstname": "Super",
      "lastname": "Admin",
      "email": "admin@rasdinerie.com",
      "address": "1 rue victor hugo",
      "additional_address": null,
      "city": "Lille",
      "zip": "59000",
      "password": "password",
      "is_premium": false,
      "role": "admin",
      "createdAt": "2020-08-17T23:55:29.212Z",
      "updatedAt": "2020-08-17T23:55:29.212Z",
      "creditCards": [],
      "commands": []
  },
  1 : {
      "id": 2,
      "firstname": "Jean",
      "lastname": "Louche",
      "email": "jlouche@gmail.com",
      "address": "1 rue de la victoire",
      "additional_address": null,
      "city": "Lille",
      "zip": "59000",
      "password": "123456",
      "is_premium": true,
      "role": "user",
      "createdAt": "2020-08-17T23:55:29.212Z",
      "updatedAt": "2020-08-17T23:55:29.212Z",
      "creditCards": [],
      "commands": []
  },
  2 : {
      "id": 3,
      "firstname": "Zoe",
      "lastname": "Kesako",
      "email": "zoe.kesako@gmail.com",
      "address": "1 rue Solferino",
      "additional_address": null,
      "city": "Lille",
      "zip": "59000",
      "password": "123456",
      "is_premium": true,
      "role": "user",
      "createdAt": "2020-08-17T23:55:29.212Z",
      "updatedAt": "2020-08-17T23:55:29.212Z",
      "creditCards": [],
      "commands": []
  }
  };


  res.json( allCustomers );

});



module.exports = router;