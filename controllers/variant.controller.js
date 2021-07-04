const Variant = require("../models/variant.model.js");
const { v4: uuidv4 } = require('uuid');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Variant
    const variant = new Variant({
      name: req.body.name,
      id: uuidv4(),
      productId: req.body.productId
    });
  
    // Save Variant in the database
    Variant.create(variant, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Variant."
        });
      else res.send(data);
    });
  };

// Find a single Variant with imageId and variantId
exports.findOne = (req, res) => {
    Variant.findById(req.params.productId, req.params.variantId, (err, data) => {
        if (err) {
            if (err.status === "not_found") {
                res.status(404).send({
                    message: `Variant with product id ${req.params.productId} and variant id ${req.params.variantId} not found.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Variant with product id ${req.params.productId} and variant id ${req.params.variantId} not found.`
                });
            }
        } else res.send(data);
    });
};