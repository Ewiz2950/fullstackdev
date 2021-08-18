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

  req.body.product.imageName = req.files.filter(file => file.fieldname === 'mainImage')[0].filename;
  
  Product.create(req.body.product)
    .then(id => Variant.create(req.body.variant, id))
    .then(variants => {
      if (req.files.length > 0) {
        variantList = [];
        variants.forEach(variant => {
          variantList.push({id: Object.values(variant)[0], images: images[Object.keys(variant)[0]]});
        })
        Image.create(variantList);
      }
    })
    .then(() => res.redirect("/staff/product"))
    .catch(err => console.error(err))
})

router.get('/product/update/:productId', function (req, res, next) {
  fetch("http://localhost:5000/search/product?id=" + req.params.productId, {
    method: "GET",
 })
  .then(response => response.json())
  .then(response => {
      var data = {
          body: templates.addProduct({
              product: response,
          })
      };
      res.send(templates.main(data))
  })
});

router.post('/product/update/:productId', upload.any(), function (req, res, next) {

  var images = req.files.reduce((acc, value) => {
    if (value.fieldname != "mainImage") {
    if (!acc[value.fieldname]) {
      acc[value.fieldname] = [];
    }
      acc[value.fieldname].push(value.filename);
    }
    return acc

  }, {})


  if (Object.keys(req.body.variant).length > 1) {
    req.body.product.hasVariant = true
  } else {
    req.body.product.hasVariant = false;
  }

  if (req.files.filter(file => file.fieldname === 'mainImage').length != 0) {
    req.body.product.imageName = req.files.filter(file => file.fieldname === 'mainImage')[0].filename;
    console.log(req.body.product);
  }

  let updateProduct = Product.update(req.body.product);
  let updateProductImage = updateProduct.then(() => {
    if (req.body.product.imageName) {
      Product.imageUpdate(req.body.product)
    }
    else {
      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  });
  let findVariants = updateProduct.then(id => {
    return Variant.findByProductId(id);
  })

  let deleteVariantImages = findVariants.then(result => {
    let promises = [];
    var deleted = [];
    var variants = [];
    Object.values(req.body.variant).forEach(v => {
      variants.push(v.id);
    });
    result.forEach(r => {
      if (!variants.includes(r.id)) {
        deleted.push(r.id)
      }
    })
    deleted.forEach(r => {
      promises.push(Image.deleteByVariantId(r));
    })
    return Promise.all(promises);
  })

  let deleteUpdatedImages = deleteVariantImages.then(() => {
    let promises = [];
    Object.keys(images).forEach(r => {
      promises.push(Image.deleteByVariantId(r));
    })
    return Promise.all(promises);
  })

  let deleteVariants = deleteVariantImages.then(result => {
    let promises = [];
    if (result.length > 0) {
      result.forEach(r => {
        promises.push(Variant.deleteById(r));
      })
        return Promise.all(promises);
    } 
    else {
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    }
  })
  let updateVariants = updateProduct.then(id => {
    var promises = [];
    var current = [];
    var newVariant = [];
    Object.values(req.body.variant).forEach(v => {
      if (v.id) {
        current.push(v);
      } else {
        newVariant.push(v);
      }
    });
    if (current.length > 0) {
      promises.push(Variant.updateById(current, id));
    } 
    if (newVariant.length > 0) {
      promises.push(Variant.create(newVariant, id));
    }
    return Promise.all(promises);
  });

  let updateNewImages = updateVariants.then(result => {
    var newImages = req.files.filter(file => file.fieldname.substr(0, 12) === 'variantImage')
    .reduce((acc, value) => {
      if (!acc[value.fieldname]) {
        acc[value.fieldname] = [];
      }

      acc[value.fieldname].push(value.filename);
      return acc

    }, {})
    if (Object.keys(newImages).length > 0) {
      variantList = [];
      result[result.length - 1].forEach(variant => {
        if (newImages[Object.keys(variant)[0]]) {
          variantList.push({id: Object.values(variant)[0], images: newImages[Object.keys(variant)[0]]});
        }
      })
      Image.create(variantList);
    }
  })

  let updateImages = deleteUpdatedImages.then(result => {
    let promises = [];
    result.forEach(r => {
      if (!(r.substr(0, 12) === 'variantImage')) {
        promises.push(Image.create([{id: r, images: images[r]}]));
      }
    })
    return Promise.all(promises);
  })

  Promise.all([updateProduct, updateProductImage, findVariants, deleteVariantImages, updateNewImages, deleteUpdatedImages, deleteVariants, updateVariants, updateImages])
  .then(() => res.redirect("/staff/product"))
  .catch(err => console.error(err))
})

router.get('/product/relist/:productId', function (req, res, next) {
  Product.setListing(req.params.productId, true)
  .then(res.redirect("/staff/product"))
  .catch(err => console.error(err))
});

router.get('/product/unlist/:productId', function (req, res, next) {
  Product.setListing(req.params.productId, false)
  .then(res.redirect("/staff/product"))
  .catch(err => console.error(err))
});

module.exports = router;