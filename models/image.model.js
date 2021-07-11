const connection = require('../config/connection.js')

// constructor
const Image = function(image) {
  this.variant_id = image.variant_id;
  this.product_id = image.product_id;
  this.image = image.image;
};

Image.create = (image, result) => {
  connection.query("INSERT INTO image SET ?", image, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { productId: image.product_id, variantId: image.variant_id, name: image.image });
  });
};

Image.findByVariant = (variantId, result) => {
  connection.query("SELECT variant_id, image FROM image WHERE variant_id = ?", variantId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Image;
