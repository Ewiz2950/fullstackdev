const connection = require('../../config/connection.js')

// constructor
const productVariant = function(productVariant) {
  this.productId = productVariant.productId;
  this.variantId = productVariant.variantId;
};

productVariant.create = (productVariant, result) => {
  connection.query("INSERT INTO product_variant SET ?", productVariant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, productVariant.variantId);
  });
};


productVariant.getById = (productId, result) => {
  connection.query("SELECT variantId FROM product_variant WHERE productId = ?", productId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return; 
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found Product with the id
    reject({ status: "not_found" }, null);
  })
}

module.exports = productVariant;