const connection = require('../../config/connection.js')

// constructor
const variantImage = function(variantImage) {
  this.variantId = variantImage.variantId;
  this.imageId = variantImage.imageId;
};

variantImage.create = (variantImage, result) => {
  connection.query("INSERT INTO variant_image SET ?", variantImage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, variantImage.variantId);
  });
};

variantImage.getById = (variantId, result) => {
  connection.query("SELECT imageId FROM variant_image WHERE variantId = ?", variantId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return; 
    }

    if (res.length) {
      result(null, res);
      return;
    }

    reject({ status: "not_found" }, null);
  })
}

module.exports = variantImage;