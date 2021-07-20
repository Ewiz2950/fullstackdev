var express = require('express');
var router = express.Router();
const {v4: uuidv4} = require('uuid');
var templates = require('../dist/views/templates.js');
const path = require('path');

const Product = require("../controllers/product/product.controller.js");
const Variant = require("../controllers/product/variant.controller.js");
const Image = require("../controllers/product/image.controller.js");
const variantImage = require("../controllers/product/variantImage.controller.js")
const productVariant = require("../controllers/product/productVariant.controller.js");


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


router.get('/product/add', function (req, res, next) {
  res.send(templates.main({body: templates.addProduct}));
});

router.post('/product/add', upload.any(), function (req, res, next) {

  let variantImages = [];

  req.files.filter(file => file.fieldname.substr(0, 12) === 'variantImage')
    .reduce((acc, value) => {
      if (!variantImages[value.fieldname]) {
        variantImages[value.fieldname] = [];
      }

      variantImages[value.fieldname].push(value.filename)

      return acc

    }, [])
  
  if (req.body.variant.length > 1) {
    req.body.product.hasVariant = true
  } else {
    req.body.product.hasVariant = false;
  }
  
  Promise.all([Product.create(req.body.product), Variant.create(req.body.variant)])
    .then(result => {
      let promises = [];
      promises.push(productVariant.create(result[0], result[1]));
      for (image in variantImages) {
        promises.push(Image.create(variantImages[image]));
      }
      return Promise.all(promises)
    })
    .then(result => {
      let promises = [];
      for (let i = 0; i < result.length - 1; i++) {
        promises.push(variantImage.create(result[0][i], result[i + 1]))
      }
      return Promise.all(promises)
    })
    .then(() => {
      res.redirect('/staff/product')
    })
    .catch(err => console.error(err))
})

module.exports = router;