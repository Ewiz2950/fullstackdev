const {check, validationResult} = require('express-validator');
var express = require('express');
var router = express.Router();
const {v4: uuidv4} = require('uuid');
var templates = require('../dist/views/templates.js');
const Product = require("../controllers/product.controller.js");
const Variant = require("../controllers/variant.controller.js");
const Image = require("../controllers/image.controller.js");
const path = require('path');

// multer config
var multer = require('multer');
const storage = multer.diskStorage({
  destination: './dist/public/uploads',
  filename: function (_req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

var upload = multer({storage: storage});


const sortVariant = (files, body) => {
  let product = {}
  product["main"] = {
    product_id: uuidv4(),
    variant_id: uuidv4(),
    name: body["name"],
    description: body["description"],
    brand: body["brand"],
    price: body["price"],
    category: body["category"],
    subCategory: body["subCategory"],
    promotion: body["promotion"],
    images: files.filter(file => file.fieldname === 'mainImage').map(file => file.filename)
  }

  var variantImageList = files.filter(file => file.fieldname.substr(0, 12) === 'variantImage');
  for (let i = 0; i < variantImageList.length; i++) {
    var image = variantImageList[i];
    var number = image.fieldname.slice(image.fieldname.length - 1);
    var variantName = body["variantName" + number].trim();
    if (variantName != '') {
      if (!(variantName in product)) {
        var variantId = uuidv4();
        product[variantName] = {
          name: variantName,
          variant_id: variantId,
          images: [image.filename]
        };
      } else {
        product[variantName]['images'].push(image.filename);
      }
    }
  }
  return product;
}

const validator = [
  check('name').trim().not().isEmpty().withMessage('Name is required.'),
  check('description').trim().not().isEmpty().withMessage('Description is required.'),
  check('brand').trim().not().isEmpty().withMessage('Brand is required.'),
  check('price').trim().not().isEmpty().withMessage('Price is required.')
    .isFloat({min:0.05})
    .withMessage('Price is not valid.')
]

const validateImages = (req, res, next) => {
  const acceptedFileType = ['png', 'jpg', 'jpeg'];
  if (req.files.length != 0) {
    req.files.forEach(file => {
      var fileExtension = file.originalname.split(".")[1];
      if (!(acceptedFileType.includes(fileExtension))) {
        return res.send(templates.main({body: templates.addProduct({imageError: "<p class='text-danger'>Image file is not valid.</p>"})}))
      }
    })
  } else return res.send(templates.main({body: templates.addProduct({imageError: "<p class='text-danger'>Image is required.</p>"})}))
  next();
}

const result = (req, res, next) => {
  const result = validationResult(req);
  const hasError = !result.isEmpty();

  if (hasError) {
    return res.send(templates.main({body: templates.addProduct({errors: result.errors})}))
  }
  
  next()
};

router.get('/addProduct', function (req, res, next) {
  var data = {
    body: templates.addProduct
  };

  res.send(templates.main(data));
});

router.post('/addProduct', upload.any(), validator, result, validateImages, function (req, res, next) {
  var files = sortVariant(req.files, req.body);
  Promise
    .all([Product.create(files), Variant.create(files), Image.create(files)])
    .then(() => res.redirect("/staff/products"))
    .catch(function (err) {
      console.log(err)
    });
})

module.exports = router;