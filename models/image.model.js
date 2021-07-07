const connection = require('../config/connection.js')

// constructor
const Image = function(image) {
  this.product_id = image.product_id;
  this.variant_id = image.variant_id;
  this.image = image.image;
};

Image.create = (image, result) => {
  connection.query("INSERT INTO image SET ?", image, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created image: ", { productId: image.product_id, variantId: image.variant_id, name: image.image });
    result(null, { productId: image.product_id, variantId: image.variant_id, name: image.image });
  });
};

Image.findById = (productId, variantId, result) => {
  connection.query(
    `SELECT * FROM image WHERE product_id = ${productId} 
    AND variant_id = ${variantId}`, 
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found image: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Image with the id
    result({ status: "not_found" }, null);
  });
};

module.exports = Image;
