var express = require('express');
var router = express.Router();
var templates = require('../dist/views/templates.js');

router.get('/', function (req, res, next) {
    var data = {
        body: templates.index
    };
    res.send(templates.main(data));
});

router.get('/search', function (req, res, next) {
    var data = {
        body: templates.productGrid({search: "Laptop"})
    };

    res.send(templates.main(data));
});


router.get('/product', function (req, res, next) {
    var data = {
        body: templates.product()
    };

    res.send(templates.main(data));
});

router.get('/category', function (req, res, next) {
    var data = {
        body: templates.productGrid({category: "Laptops"})
    };

    res.send(templates.main(data));
});

router.get('/category', function (req, res, next) {
    var data = {
        body: templates.productGrid({category: "Laptops"})
    };

    res.send(templates.main(data));
});

module.exports = router;
