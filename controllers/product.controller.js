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
            name: req.main.name,
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
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err) {
            return (err)
        } else return(data);
    });
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.status === "not_found") {
                return `Product with id ${req.params.productId} not found.`;
            } else return (err)
        } else return(data);
    });
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
            } else return(data);
        }
    );
};