var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
var templates = require('../dist/views/templates.js');

const Product = require("../controllers/product/product.controller.js");
const Variant = require("../controllers/product/variant.controller.js");
const Image = require("../controllers/product/image.controller.js");


router.get('/', function (req, res, next) {
    let filters = {};
    filters.search = req.query.q;

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
                search: req.query.q
            })
        };
        res.send(templates.main(data))
    })
})

router.post('/products', function (req, res, next) {
    let filters = req.body;
    let sort = filters.sort;
    delete filters.sort;

    let product = Product.findAll(filters);
    let variants = product.then(result => {
        let promises = [];
        result.forEach(product => {
            promises.push(Variant.findByProductId(product.id))
        })
        return Promise.all(promises)
    })
    let images = variants.then(result => {
        let promises = [];
        result.forEach(v => {
            promises.push(Image.findByVariantId(v[0].id))
        })
        return Promise.all(promises)
    })

    Promise.all([product, variants, images])
        .then(result => {
            for (let i = 0; i < result[0].length; i++) {
                for (let x = 0; x < result[1][i].length; x++) {
                    result[1][i][x].images = result[2][i];
                }
                result[0][i].variants = result[1][i]
            }
            return result[0]
        })
        .then((result) => {
            if (sort == "AZ") {
                result.sort((a, b) => a.brand.localeCompare(b.brand));
            } else if (sort == "ZA") {
                result.sort((a, b) => b.brand.localeCompare(a.brand));
            } else if (sort == "LH") {
                result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            } else if (sort == "HL") {
                result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            }
            res.json(result);
        })
        .catch(err => console.error(err))
});

router.get('/product', function (req, res, next) {
    let productId = req.query.id;

    let product = Product.findOne(productId);
    let variant = Variant.findByProductId(productId)
    let images = variant.then(result => {
        let promises = [];
        result.forEach(variant => {
            promises.push(Image.findByVariantId(variant.id))
        })
        return Promise.all(promises)
    })

    Promise.all([product, variant, images])
    .then(result => {
        for (let i = 0; i < result[1].length; i++) {
            result[1][i].images = result[2][i];
        }
        result[0].variants = result[1]

        return result[0]
    })
    .then((result) => {
        res.json(result);
    })
    .catch(err => console.error(err))
    })

module.exports = router;