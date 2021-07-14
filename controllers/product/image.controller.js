const {v4: uuidv4} = require('uuid');
const Image = require("../../models/product/image.model.js");

exports.create = (req) => {
  if (!req) {
    return new Promise((resolve, reject) => {
      resolve('Empty content.')
    })
  };

  let promises = [];

  req.forEach(imageName => {
    promises.push(new Promise((resolve, reject) => {
      // Create a Image
      const image = new Image({
        imageName: imageName,
        id: uuidv4()
      });

      // Save Image in the database
      Image.create(image, (err, data) => {
        if (err) reject(err)
        else resolve(data);
      });
    }))
  });
  return Promise.all(promises);
}

exports.findById = (images) => {
  if (!images) {
    return new Promise((resolve, reject) => {
      reject('Empty content.')
    })
  };

  let promises = [];

  images.forEach(imageId => {
    promises.push(new Promise((resolve, reject) => {
      Image.findById(imageId.imageId, (err, data) => {
        if (err) {
          if (err.status === "not_found") {
            reject({ status: "not_found" })
          } else {
            reject(err)
          }
        } else resolve(data);
      });
    }))
  })

  return Promise.all(promises)
};