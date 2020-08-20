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
	res.send('ask smtg to the orders api !');
});



router.get('/bacic_info?', (req,res) => {
	let token = req.query.token;
	if ( token == undefined ) res.send( "token non fourni" );

  let allOrders = {
    0 : { id : 0 , idClient : "Jean", delivery_adress : "Lille", Prix_tt : "69€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    1 : { id : 1 , idClient : "Silva", delivery_adress : "Porto-rico", Prix_tt : "69€", abonnement : "prenium" , status : "On the way" , date_livraison : new Date()},
    2 : { id : 2 , idClient : "Jean", delivery_adress : "Lille", Prix_tt : "69€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    3 : { id : 3 , idClient : "Jacques", delivery_adress : "Lille", Prix_tt : "69€", abonnement : "standard", status : "On the way" , date_livraison : new Date() },
    4 : { id : 4 , idClient : "Jean", delivery_adress : "Santa-Cruz", Prix_tt : "69€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    5 : { id : 5 , idClient : "JaiTresFAIM", delivery_adress : "Lille", Prix_tt : "1259€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    6 : { id : 6 , idClient : "Jean", delivery_adress : "Lille", Prix_tt : "69€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    7 : { id : 7 , idClient : "Silva", delivery_adress : "Porto-rico", Prix_tt : "69€", abonnement : "prenium" , status : "On the way" , date_livraison : new Date()},
    8 : { id : 8 , idClient : "Jean", delivery_adress : "Lille", Prix_tt : "69€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    9 : { id : 9 , idClient : "Jacques", delivery_adress : "Lille", Prix_tt : "69€", abonnement : "standard", status : "On the way" , date_livraison : new Date() },
    10 : { id : 10 , idClient : "Jean", delivery_adress : "Santa-Cruz", Prix_tt : "69€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    11 : { id : 11 , idClient : "JaiTresFAIM", delivery_adress : "Lille", Prix_tt : "1259€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    12 : { id : 12 , idClient : "Jean", delivery_adress : "Lille", Prix_tt : "69€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    13 : { id : 13 , idClient : "Silva", delivery_adress : "Porto-rico", Prix_tt : "69€", abonnement : "prenium" , status : "On the way" , date_livraison : new Date()},
    14 : { id : 14 , idClient : "Jean", delivery_adress : "Lille", Prix_tt : "69€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    15 : { id : 15 , idClient : "Jacques", delivery_adress : "Lille", Prix_tt : "69€", abonnement : "standard", status : "On the way" , date_livraison : new Date() },
    16 : { id : 16 , idClient : "Jean", delivery_adress : "Santa-Cruz", Prix_tt : "69€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
    17 : { id : 17 , idClient : "JaiTresFAIM", delivery_adress : "Lille", Prix_tt : "1259€", abonnement : "prenium", status : "On the way" , date_livraison : new Date() },
  };


  res.json( allOrders );

});



module.exports = router;