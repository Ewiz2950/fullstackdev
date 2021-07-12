var express = require('express');
var router = express.Router();
const {v4: uuidv4} = require('uuid');
var templates = require('../dist/views/templates.js');
const path = require('path');

const Product = require("../controllers/product.controller.js");
const Variant = require("../controllers/variant.controller.js");
const Image = require("../controllers/image.controller.js");


// multer config
var multer = require('multer');
const storage = multer.diskStorage({
  destination: './dist/public/uploads',
  filename: function (_req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

var upload = multer({storage: storage});


router.get('/product/add', function (req, res, next) {

  res.send(templates.main({body: templates.addProduct}));

});

router.post('/product/add', upload.any(), function (req, res, next) {
  
  req.body.product.image = req.files.filter(x => x.fieldname == "productImage").map(obj => obj.filename);
  console.log(req.body);
})

module.exports = router;