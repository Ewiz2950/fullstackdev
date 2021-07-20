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

// router.post('receipt', function (req, res, next){
//     res.redirect('/views/index')
// });
module.exports = router;
