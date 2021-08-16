var express = require('express');
var router = express.Router();
var templates = require('../dist/views/templates.js');

const Product = require("../controllers/product/product.controller.js");
const Variant = require("../controllers/product/variant.controller.js");
const Image = require("../controllers/product/image.controller.js");
const productVariant = require("../controllers/product/productVariant.controller.js");
const variantImage = require("../controllers/product/variantImage.controller.js");

router.get('/', function (req, res, next) {
    var data = {
        body: templates.productGrid({
            search: "Laptop"
        })
    };

    res.send(templates.main(data));
});

router.post('/products', function (req, res, next) {
    let filters = req.body;

    let product = Product.findAll(filters);
    let variants = product.then(products => {
        let promises = [];
        products.forEach(product => {
            promises.push(productVariant.findVariantId(product.id))
        })
        return Promise.all(promises)
    }).then(result => {
        let promises = [];
        result.forEach(variantIds => {
            promises.push(Variant.findById(variantIds))
        })
        return Promise.all(promises)
    })

    let image = variants.then(variants => {
        let promises = [];
        if (variants.length > 0) {
            variants.forEach(variantList => {
                variantList.forEach(variant => {
                    promises.push(variantImage.findVariantImageId(variant.id))
                })
            });
            return Promise.all(promises)
        }
        return []
    }).then(result => {
        if (result.length > 0) {
            let promises = [];
            result.forEach(images => {
                promises.push(Image.findById(images))
            })
            return Promise.all(promises)
        }
        return []
    })

    Promise.all([product, image, variants])
        .then(result => {
            for (var i = 0; i < result[1].length; i++) {
                result[2].forEach(variant => {
                    variant.forEach(x => {
                        x.images = result[1][result[2].flat().indexOf(x)]
                    })
                })
            }

            for (var i = 0; i < result[0].length; i++) {
                result[0][i].variants = result[2][i];
            }
            return result[0]
        })
        .then((result) => {
            res.json(result);
        })
        .catch(err => console.error(err))

});

router.get('/product', function (req, res, next) {
    let productId = req.query.id;

    let product = Product.findOne(productId);
    let variantId = productVariant.findVariantId(productId)
    let variant = variantId.then(variants => {
        return Variant.findById(variants)
    })
    let variantimage = variantId.then(variants => {
        let promises = [];
        variants.forEach(variantId => {
            promises.push(variantImage.findVariantImageId(variantId.variantId))
        })
        return Promise.all(promises)
    }).then(result => {
        let promises = [];
        result.forEach(images => {
            promises.push(Image.findById(images))
        })
        return Promise.all(promises)
    })

    Promise.all([product, variantId, variant, variantimage]).then(result => {
            for (let i = 0; i < result[3].length; i++) {
                result[2][i].images = result[3][i];
            }
            result[0].variants = result[2];
            return result[0]
        })
        .then((result) => {
            res.json(result);
        })
        .catch(err => console.error(err))
})

module.exports = router;