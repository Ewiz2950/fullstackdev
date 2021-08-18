var express = require('express');
var router = express.Router();
var templates = require('../dist/views/templates.js');
var Review = require('../models/review.model');
var db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
var schema = require('../config/schema');
const connection = require('../config/db');

//review ID
connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT MAX(review_id) AS ReviewID FROM review", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      console.log(result[0].ReviewID);
      if (result[0].ReviewID == null){
          reviewID = 1;
      }else{
        reviewID = parseInt(result[0].ReviewID) + 1;
        reviewID = reviewID.toString();
      }
    return reviewID;  
    });
});

// register Page
router.get('/', function (req, res, next) {
    var data = {
        body: templates.review(),  
    };
    
    res.send(templates.main(data));
    
});

router.post('/', function (req, res, next){
    
    let reviewStar = req.body.rate;
	let reviewText = req.body.reviewText;
    let review_id =  reviewID;
    let product_id = 1; //req.product_id;
    console.log(reviewStar,reviewText,review_id,product_id);

    Review.create({
        reviewText,
        reviewStar,
        review_id,
        product_id
    })
    res.redirect('/');

});
module.exports = router;