var express = require('express');
const fetch = require("node-fetch");
var router = express.Router();
var templates = require('../dist/views/templates.js');

router.get('/', function (req, res, next) {
    fetch("http://localhost:5000/search/products", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({promotion: "Featured"})
      })
      .then(response => response.json())
      .then(response => {
          var data = {
              body: templates.index({
                products: response.slice(0, 4)
              })
          };
          res.send(templates.main(data))
      })
      .catch(err => console.error(err))
})

router.get('/product/:productId', function (req, res, next) {

    fetch("http://localhost:5000/search/product?id=" + req.params.productId, {
        method: "GET",
     })
    .then(response => response.json())
    .then(response => {
        var data = {
            body: templates.product({
                product: response,
            })
        };
        res.send(templates.main(data))
    })
})

router.get('/category/:category', function (req, res, next) {
    let filters = {};
    let category = "";
    req.params.category.split('-').forEach(word => {
        if (word.toLowerCase() != 'tvs') {
            category += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + " ";
        } else {
            category += word.slice(0, 2).toUpperCase() + word.slice(2).toLowerCase() + " ";
        }
    })

    filters.subcategory = category.trim();

    fetch("http://localhost:5000/search/products", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(filters)
    })
    .then(response => response.json())
    .then(response => {
        var data = {
            body: templates.productGrid({
                products: response,
                category: category.trim()
            })
        };
        res.send(templates.main(data))
    })
})

module.exports = router;