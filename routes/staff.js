var express = require('express');
const fetch = require("node-fetch");
var router = express.Router();
const {v4: uuidv4} = require('uuid');
var templates = require('../dist/views/templates.js');
const path = require('path');

const Product = require("../controllers/product/product.controller.js");
const Variant = require("../controllers/product/variant.controller.js");
const Image = require("../controllers/product/image.controller.js");


// multer config
var multer = require('multer');
const { read } = require('fs');
const storage = multer.diskStorage({
  destination: './dist/public/uploads',
  filename: function (_req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage
});

router.get('/product', function (req, res, next) {
  fetch("http://localhost:5000/search/products", {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({})
  })
  .then(response => response.json())
  .then(response => {
      var data = {
          body: templates.productList({
          products: response,
          })
      };
      res.send(templates.main(data))
  })
  .catch(err => console.error(err))
});

router.get('/product/add', function (req, res, next) {
  res.send(templates.main({body: templates.addProduct}));
});

router.post('/product/add', upload.any(), function (req, res, next) {
  
  var images = req.files.filter(file => file.fieldname.substr(0, 12) === 'variantImage')
    .reduce((acc, value) => {
      if (!acc[value.fieldname]) {
        acc[value.fieldname] = [];
      }

      acc[value.fieldname].push(value.filename);
      return acc

    }, {})
  
  if (req.body.variant.length > 1) {
    req.body.product.hasVariant = true
  } else {
    req.body.product.hasVariant = false;
  }
  
  Product.create(req.body.product)
    .then(id => Variant.create(req.body.variant, id))
    .then(variants => {
      variantList = [];
      variants.forEach(variant => {
        variantList.push({id: Object.values(variant)[0], images: images[Object.keys(variant)[0]]});
      })
      Image.create(variantList);
    })
    .catch(err => console.error(err))
})

module.exports = router;