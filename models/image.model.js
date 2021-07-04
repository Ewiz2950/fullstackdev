const connection = require('../config/connection.js')

// constructor
const Image = function(image) {
  this.productId = image.productId;
  this.variantId = image.variantId;
  this.name = image.name;
};

Image.create = (image, result) => {
  connection.query("INSERT INTO image SET ?", image, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created image: ", { id: res.id, image });
    result(null, { id: res.id, name: res.name, description: res.description, price: res.price });
  });
};

Image.findById = (productId, variantId, result) => {
  connection.query(
    `SELECT * FROM image WHERE product_id = ${productId} 
    AND variant_id = ${variantId}`, 
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found image: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Image with the id
    result({ status: "not_found" }, null);
  });
};