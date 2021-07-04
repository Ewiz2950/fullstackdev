const Product = require("../models/product.model.js");
const { v4: uuidv4 } = require('uuid');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Product
    const product = new Product({
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        subCategory: req.body.subCategory,
        promotion: req.body.promotion
    });

    // Save Product in the database
    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        else res.send(data);
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.status === "not_found") {
                res.status(404).send({
                    message: `Product with id ${req.params.productId} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.productId
                });
            }
        } else res.send(data);
    });
};

// Update a Product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Product.updateById(
        req.params.productId,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.status === "not_found") {
                    res.status(404).send({
                        message: `Product with id ${req.params.productId} not found.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.params.productId
                    });
                }
            } else res.send(data);
        }
    );
};