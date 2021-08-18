const connection = require('../../config/connection.js')

// constructor
const Variant = function (variant) {
  this.id = variant.id;
  this.product_id = variant.product_id;
  this.name = variant.name;
  this.quantity = variant.quantity;
  this.imageField = variant.imageField;
};

Variant.create = (variant, result) => {
  connection.query("INSERT INTO variant SET id = ?, product_id = ?, name = ?, quantity = ?", 
  [variant.id, variant.product_id, variant.name, variant.quantity], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {[variant.imageField]: variant.id});
  });
};

Variant.updateById = (variant, result) => {
  connection.query("UPDATE variant SET product_id = ?, name = ?, quantity = ? WHERE id = ?", 
  [variant.product_id, variant.name, variant.quantity, variant.id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {[variant.imageField]: variant.id});
  });
};

Variant.deleteById = (id, result) => {
  connection.query("DELETE FROM variant WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, id);
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
      result({
        status: "not_found"
      }, null);
    });
};

Variant.findByProductId = (productId, result) => {
  connection.query(
    "SELECT * FROM variant WHERE product_id = ?", productId,
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
      result({
        status: "not_found"
      }, null);
    });
};

module.exports = Variant;