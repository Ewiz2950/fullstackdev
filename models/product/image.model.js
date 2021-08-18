const connection = require('../../config/connection.js')

// constructor
const Image = function(image) {
  this.id = image.id;
  this.imageName = image.imageName;
  this.variant_id = image.variant_id;
};

Image.create = (image, result) => {
  connection.query("INSERT INTO image SET ?", image, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, image.id);
  });
};

Image.findByVariantId = (variantId, result) => {
  connection.query(
    "SELECT * FROM image WHERE variant_id = ?", variantId,
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      result(null, res);
      return;
    }

    result({ status: "not_found" }, null);
  });
};

Image.deleteByVariantId = (variantId, result) => {
  connection.query(
    "DELETE FROM image WHERE variant_id = ?", variantId,
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, variantId);

    result({ status: "not_found" }, null);
  });
};

module.exports = Image;
