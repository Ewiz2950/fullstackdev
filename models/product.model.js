const connection = require('../config/connection.js')

// constructor
const Product = function(product) {
  this.product_id = product.product_id;
  this.name = product.name;
  this.description = product.description;
  this.price = product.price;
  this.category = product.category;
  this.subCategory = product.subCategory;
  this.promotion = product.promotion;
};

Product.create = (product, result) => {
  connection.query("INSERT INTO product SET ?", product, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created product: ", { id: product.product_id, name: product .name });
    result(null, res);
  });
};

Product.findById = (productId, result) => {
  connection.query(`SELECT * FROM image WHERE product_id = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ status: "not_found" }, null);
  });
};

Product.getAll = result => {
  connection.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  connection.query(
    `UPDATE product SET name = ?, description = ?, price = ?, category = ?, 
     subCategory = ?, promotion = ? WHERE id = ?`,
    [product.name, product.description, product.price, product.category, 
     product.subCategory, product.promotion],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ "status": "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, product });
      result(null, { id: id, product });
    }
  );
};

Product.setListing = (id, product, listing, result) => {
    connection.query(
      "UPDATE product SET listing = ? WHERE product_id = ?", listing,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Product with the id
          result({ status: "not_found" }, null);
          return;
        }
  
        console.log("updated product: ", { id: id, product });
        result(null, { id: id, product });
      }
    );
  };

module.exports = Product;