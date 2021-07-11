const connection = require('../config/connection.js')

// constructor
const Variant = function(variant) {
  this.variant_id = variant.variant_id;
  this.product_id = variant.product_id;
  this.name = variant.name;
};

Variant.create = (variant, result) => {
  connection.query("INSERT INTO variant SET ?", variant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Variant.findById = (productId, variantId, result) => {
  connection.query(
    "SELECT * FROM variant WHERE product_id = ? AND variant_id != ?", [productId, variantId],
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

    // not found Variant with the id
    result({ status: "not_found" }, null);
  });
};

module.exports = Variant;