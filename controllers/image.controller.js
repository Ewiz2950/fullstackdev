const Image = require("../models/image.model.js");

exports.create = (req, res) => {
  if (!req) {
    return new Promise((resolve, reject) => {reject('Empty content.')})
  };

  let promises = [];

  for (variantName in req) {
    req[variantName].images.forEach(imageName => {
      promises.push(new Promise((resolve, reject) => {
        // Create a Image
        const image = new Image({
          image: imageName,
          variant_id: req[variantName].variant_id,
          product_id: req.main.product_id
        });
        
        // Save Image in the database
        Image.create(image, (err, data) => {
          if (err) reject(err)
          else resolve();
        });
      }))
    })
  };
  return Promise.all(promises);
}

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