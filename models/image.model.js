const connection = require('../config/connection.js')

// constructor
const Image = function(image) {
  this.id = image.id;
  this.imageName = image.imageName;
};

Image.create = (image, result) => {
  connection.query("INSERT INTO image SET ?", image, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: image.id, imageName: image.imageName });
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
