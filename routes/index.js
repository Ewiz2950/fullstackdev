var express = require('express');
var router = express.Router();
var templates = require('../dist/views/templates.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = {
        body: templates.index(),
    };

    res.send(templates.main(data));
});


module.exports = router;
