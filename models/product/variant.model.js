const connection = require('../../config/connection.js')

// constructor
const Variant = function(variant) {
  this.id = variant.id;
  this.name = variant.name;
  this.quantity = variant.quantity;
};

Variant.create = (variant, result) => {
  connection.query("INSERT INTO variant SET ?", variant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, variant.id);
  });
};

Variant.findById = (variantId, result) => {
  connection.query(
    "SELECT * FROM variant WHERE id = ?", variantId,
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      result(null, res[0]);
      return;
    }

    // not found Variant with the id
    reject({ status: "not_found" }, null);
  });
};

module.exports = Variant;