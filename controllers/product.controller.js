const Product = require("../models/product.model.js");

exports.create = (req) => {

    return new Promise((resolve, reject) => {
        // Validate request
        if (!req) {
            reject("Empty content.")
        }
        // Create a Product
        const product = new Product({
            product_id: req.main.product_id,
            variant_id: req.main.variant_id,
            name: req.main.name,
            brand: req.main.brand,
            description: req.main.description,
            price: req.main.price,
            category: req.main.category,
            subCategory: req.main.subCategory,
            promotion: req.main.promotion
        });

        // Save Product in the database
        Product.create(product, (err, data) => {
            if (err) reject(err)
            else resolve()
        })
    })
};

// Retrieve all Products from the database.
exports.findAll = (filters) => {
    return new Promise((resolve, reject) => {
        Product.getAll(filters, (err, data) => {
            if (err) {
                reject(err)
            } else resolve(data);
        });
    })
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
    return new Promise((resolve, reject) => {
        Product.findById(req, (err, data) => {
            if (err) {
                if (err.status === "not_found") {
                    resolve()
                } else reject(err)
            } else resolve(data)
        });
    })
};

// Update a Product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req) {
        return "Content can not be empty."
    }

    Product.updateById(
        req.params.productId,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.status === "not_found") {
                    return `Product with id ${req.params.productId} not found.`;
                } else return (err)
            } else return (data);
        }
    );
};