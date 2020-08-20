// {
//     "id": 1,
//     "name": "Ratatouille",
//     "caloric": "575",
//     "products": [
//         {
//             "id": 2,
//             "name": "Poivron",
//             "description": null,
//             "price": 2,
//             "image": "https://assets.afcdn.com/recipe/20170607/67464_w300h300c1cx350cy350.jpg",
//             "stock": 50,
//             "productCategoryId": 1
//         },
//         {
//             "id": 3,
//             "name": "Aubergine",
//             "description": null,
//             "price": 3,
//             "image": "https://www.biendecheznous.be/sites/default/files/styles/image_on_detailpage/public/ps_image/istock_aubergine.jpg?itok=bSr_QuF-",
//             "stock": 100,
//             "productCategoryId": 1
//         },
//         {
//             "id": 4,
//             "name": "Courgette",
//             "description": null,
//             "price": 2,
//             "image": "https://img-3.journaldesfemmes.fr/PVIbH_pGxMFhGPl8oEkWr3DbtaY=/910x607/smart/3d4af6fac7234c2283fd7d9cf34e6981/ccmcms-jdf/10659281.jpg",
//             "stock": 50,
//             "productCategoryId": 1
//         }
//     ]
// }

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
	res.send('ask smtg to the products api !');
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
        "name": "#GemmeLaitLaitGüm",
        "price": "250",
        "products": [
            {
                "id": 2,
                "name": "Poivron",
                "description": null,
                "price": 2,
                "image": "https://assets.afcdn.com/recipe/20170607/67464_w300h300c1cx350cy350.jpg",
                "stock": 50,
                "productCategoryId": 1
            },
            {
                "id": 3,
                "name": "Aubergine",
                "description": null,
                "price": 3,
                "image": "https://www.biendecheznous.be/sites/default/files/styles/image_on_detailpage/public/ps_image/istock_aubergine.jpg?itok=bSr_QuF-",
                "stock": 100,
                "productCategoryId": 1
            },
            {
                "id": 4,
                "name": "Courgette",
                "description": null,
                "price": 2,
                "image": "https://img-3.journaldesfemmes.fr/PVIbH_pGxMFhGPl8oEkWr3DbtaY=/910x607/smart/3d4af6fac7234c2283fd7d9cf34e6981/ccmcms-jdf/10659281.jpg",
                "stock": 50,
                "productCategoryId": 1
            }
        ]
    }
  };


  res.json( allCustomers );

});



module.exports = router;
 
 
 
