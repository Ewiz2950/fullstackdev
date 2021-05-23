var express = require('express');
var router = express.Router();
var templates = require('../dist/views/templates.js');

// Checkout Page
router.get('/', function (req, res, next) {
    var data = {
        body: templates.receipt(),
    };

    res.send(templates.main(data));
});
module.exports = router;