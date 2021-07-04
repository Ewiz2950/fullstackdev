const Image = require("../models/image.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Image
    const image = new Image({
      productId: req.body.productId,
      variantId: req.body.variantId,
      name: req.body.image,
    });
  
    // Save Image in the database
    Image.create(image, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Image."
        });
      else res.send(data);
    });
  };

// Find a single Image with imageId and variantId
exports.findOne = (req, res) => {
    Image.findById(req.params.productId, req.params.variantId, (err, data) => {
        if (err) {
            if (err.status === "not_found") {
                res.status(404).send({
                    message: `Image with image id ${req.params.productId} and variant id ${req.params.variantId} not found.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Image with image id ${req.params.productId} and variant id ${req.params.variantId} not found.`
                });
            }
        } else res.send(data);
    });
};