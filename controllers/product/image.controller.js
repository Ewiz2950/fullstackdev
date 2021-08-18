const {v4: uuidv4} = require('uuid');
const Image = require("../../models/product/image.model.js");

exports.create = (req) => {
  if (!req) {
    return new Promise((resolve, reject) => {
      resolve('Empty content.')
    })
  };

  let promises = [];

  req.forEach(variant => {
    variant.images.forEach(imageName => {
      promises.push(new Promise((resolve, reject) => {
        // Create a Image
        const image = new Image({
          imageName: imageName,
          variant_id: variant.id,
          id: uuidv4()
        });
  
        // Save Image in the database
        Image.create(image, (err, data) => {
          if (err) reject(err)
          else resolve(data);
        });
      }))
    })
  });
  return Promise.all(promises);
}

exports.findByVariantId = (variantId) => {
  if (!variantId) {
    return new Promise((resolve, reject) => {
      reject('Empty content.')
    })
  };

  return new Promise((resolve, reject) => {
      Image.findByVariantId(variantId, (err, data) => {
        if (err) {
          if (err.status === "not_found") {
            resolve({ status: "not_found" })
          } else {
            reject(err)
          }
        } else resolve(data);
      });
    })
};

exports.deleteByVariantId = (variantId) => {
  if (!variantId) {
    return new Promise((resolve, reject) => {
      reject('Empty content.')
    })
  };

  return new Promise((resolve, reject) => {
      Image.deleteByVariantId(variantId, (err, data) => {
        if (err) {
          if (err.status === "not_found") {
            resolve({ status: "not_found" })
          } else {
            reject(err)
          }
        } else resolve(data);
      });
    })
};