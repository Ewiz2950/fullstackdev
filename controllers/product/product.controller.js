const {v4: uuidv4} = require('uuid');
const Product = require("../../models/product/product.model.js");

exports.create = (req) => {

    return new Promise((resolve, reject) => {
        if (!req) {
            reject("Empty content.")
        }
        // Create a Product
        const product = new Product({
            id: uuidv4(),
            quantity: req.quantity,
            brand: req.brand,
            description: req.description,
            price: req.price,
            category: req.category,
            subcategory: req.subcategory,
            promotion: req.promotion,
            hasVariant: req.hasVariant
        });

        // Save Product in the database
        Product.create(product, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

// Retrieve all Products from the database.
exports.findAll = (filters) => {
    return new Promise((resolve, reject) => {
        Product.getAll(filters, (err, data) => {
            if (err) {
                reject({ status: "not_found" })
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
                    reject({ status: "not_found" })
                } else reject(err)
            } else resolve(data)
        });
    })
};
