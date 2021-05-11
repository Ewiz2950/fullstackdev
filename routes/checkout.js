var express = require('express');
var router = express.Router();
var templates = require('../dist/views/templates.js');

// Checkout Page
router.get('/', function (req, res, next) {
    var data = {
        body: templates.checkout(),
    };

    res.send(templates.main(data));
});

//Checkout page
router.get('/checkout', (req, res) => {
	res.render('checkout',{
        text: 'haha epic'
    });
});


module.exports = router;