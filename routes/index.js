var express = require('express');
var router = express.Router();
var templates = require('../dist/views/templates.js');
const Product = require("../controllers/product.controller.js");
const Variant = require("../controllers/variant.controller.js");
const Image = require("../controllers/image.controller.js");

router.get('/', function (req, res, next) {
    var data = {
        body: templates.index
    };
    res.send(templates.main(data));
});

router.get('/search', function (req, res, next) {
    var data = {
        body: templates.productGrid({
            search: "Laptop"
        })
    };

    res.send(templates.main(data));
});


router.get('/product/:product_id', function (req, res, next) {
    let productInfo = Product.findOne(req.params.product_id);
    let variants = productInfo.then(r => Variant.findById(req.params.product_id, r.variant_id));
    let images = Promise.all([productInfo, variants]).then(r => {
        let variantList = r[1];
        variantList.push(r[0]);
        return Image.findByVariant(variantList);
    });

    Promise.all([productInfo, variants, images])
        .then(r => {
            let productInfo = {};
            let product = r[0]
            let imageList = [];
            r[2].forEach(image => {
                if (image[0].variant_id == product.variant_id) {
                    imageList.push(image[0].image)
                }
            })
            productInfo.name = product.name;
            productInfo.brand = product.brand;
            productInfo.variant_id = product.variant_id;
            productInfo.price = product.price;
            productInfo.description = product.description;
            productInfo.images = imageList

            let variantList = [];
            r[1].forEach(variant => {
                let imageList = [];
                r[2].forEach(image => {
                    if (image[0].variant_id == variant.variant_id) {
                        imageList.push(image[0].image)
                    }
                })
                variantList.push({
                    name: variant.name,
                    variant_id: variant.variant_id,
                    image: imageList
                })
            })

            var data = {
                body: templates.product({
                    product: productInfo,
                    variants: variantList
                })
            };
            res.send(templates.main(data));
        })
});

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
    filters.subCategory = category.trim();
    let result = Product.findAll(filters);
    let image = result.then(r => Image.findByVariant(r))
    Promise.all([result, image])
        .then(r => {
            let products = [];
            r[0].forEach(product => {
                let imageList = [];
                r[1].forEach(image => {
                    if (image[0].variant_id == product.variant_id) {
                        imageList.push(image[0].image)
                    }
                })
                products.push({
                    product_id: product.product_id,
                    name: product.name,
                    price: product.price,
                    brand: product.brand,
                    images: imageList
                })
            })
            var data = {
                body: templates.productGrid({
                    category: category,
                    products: products
                })
            };
            res.send(templates.main(data));
        })
});

module.exports = router;