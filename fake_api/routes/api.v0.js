const express = require('express');
const router = express.Router();

router.use( '/user' , require('./user.js') );
router.use( '/customers' , require('./customers.js') );
router.use( '/orders' , require('./orders.js') );
router.use( '/products' , require('./products.js') );
router.use( '/recipes' , require('./recipes.js') );
router.use( '/boxes' , require('./boxes.js') );

// router.use( '/producers' , require('./producers.js') );

// router.use( '/item' , require('./item.js') );
// router.use( '/skin' , require('./skin.js') );



router.get('/', (req,res)=> {
	res.send('coucou c\'est l\'api =)');
});

module.exports = router;


