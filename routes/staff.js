var express = require('express');
var router = express.Router();
var templates = require('../dist/views/templates.js');

router.get('/addProduct', function (req, res, next) {
    var data = {
        body: templates.addProduct
    };
    res.send(templates.main(data));
});

module.exports = router;