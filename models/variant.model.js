const connection = require('../config/connection.js')

// constructor
const Variant = function(variant) {
  this.id = variant.id;
  this.productId = variant.productId;
  this.name = variant.name;
};

Variant.create = (variant, result) => {
  connection.query("INSERT INTO variant SET ?", variant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created variant: ", { id: res.id, productId: res.productId, name: res.name });
    result(null, { id: res.id, productId: res.productId, name: res.name });
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