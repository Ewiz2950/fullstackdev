const Variant = require("../models/variant.model.js");

exports.create = (req) => {

  if (!req) {
    return new Promise((resolve, reject) => {reject('Empty content.')})
  };

  let promises = [];

  for (variantName in req) {
    promises.push(new Promise((resolve, reject) => {

      // Create a Variant
      const variant = new Variant({
        name: req[variantName]["name"],
        variant_id: req[variantName].variant_id,
        product_id: req.main.product_id
      });

      // Save Variant in the database
      Variant.create(variant, (err, data) => {
        if (err) reject(err)
        else resolve();
      });
    }))
  };
  
  return Promise.all(promises);
}

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