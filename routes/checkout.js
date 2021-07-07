var express = require('express');
var router = express.Router();
var templates = require('../dist/views/templates.js');
var db = require('../config/connection.js');

// Checkout Page
router.get('/', function (req, res, next) {
    var data = {
        body: templates.checkout(),
    };
    const userDetails = req.body;
    var sql = 'INSERT INTO users SET ?';
      db.query(sql, userDetails,function (err, data) { 
  });

    res.send(templates.main(data));
});
module.exports = router;