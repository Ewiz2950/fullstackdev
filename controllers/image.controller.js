const Image = require("../models/image.model.js");

exports.create = (req, res) => {
  if (!req) {
    return new Promise((resolve, reject) => {
      reject('Empty content.')
    })
  };

  let promises = [];

  for (variantName in req) {
    req[variantName].images.forEach(imageName => {
      promises.push(new Promise((resolve, reject) => {
        // Create a Image
        const image = new Image({
          image: imageName,
          product_id: req.main.product_id,
          variant_id: req[variantName].variant_id,
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

// Find images belonging to a variant
exports.findByVariant = (req, res) => {
  let promises = [];

  req.forEach(variant => {
    promises.push(new Promise((resolve, reject) => {
      Image.findByVariant(variant.variant_id, (err, data) => {
        if (err) {
          reject(err)
        } else resolve(data);
      });
    }))
  })
  return Promise.all(promises);
}