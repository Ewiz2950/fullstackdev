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
    console.log("created variant: ", { id: variant.variant_id, productId: variant.product_id, name: variant.name });
    result(null, res);
  });
};

Variant.findById = (productId, variantId, result) => {
  connection.query(
    `SELECT * FROM variant WHERE product_id = ${productId} 
    AND variant_id = ${variantId}`, 
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found variant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Variant with the id
    result({ status: "not_found" }, null);
  });
};

module.exports = Variant;