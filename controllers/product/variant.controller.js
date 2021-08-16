const {v4: uuidv4} = require('uuid');
const Variant = require("../../models/product/variant.model.js");

exports.create = (variant, id) => {

  if (!variant) {
    return new Promise((resolve, reject) => {
      reject('Empty content.')
    })
  };

  let promises = [];

  variant.forEach(variants => {
    promises.push(new Promise((resolve, reject) => {

      // Create a Variant
      const variant = new Variant({
        name: variants.name,
        id: uuidv4(),
        product_id: id,
        quantity: variants.quantity,
        imageField: variants.imageField
      });

      // Save Variant in the database
      Variant.create(variant, (err, data) => {
        if (err) reject(err)
        else resolve(data);
      });
    }))
  });

  return Promise.all(promises);
}

exports.findById = (variantIds) => {
  let promises = [];
  variantIds.forEach(variantId => {
    promises.push(new Promise((resolve, reject) => {
      Variant.findById(variantId.variantId, (err, data) => {
        if (err) {
          if (err.status === "not_found") {
            resolve()
          } else {
            reject(err)
          }
        } else resolve(data);
      });
    }))
  })

  return Promise.all(promises);
};

exports.findByProductId = (productId) => {
    return new Promise((resolve, reject) => {
      Variant.findByProductId(productId, (err, data) => {
        if (err) {
          if (err.status === "not_found") {
            resolve()
          } else {
            reject(err)
          }
        } else resolve(data);
      });
    })
};