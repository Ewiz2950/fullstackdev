const connection = require('../../config/connection.js')

// constructor
const Product = function (product) {
  this.id = product.id;
  this.quantity = product.quantity;
  this.brand = product.brand;
  this.description = product.description;
  this.price = product.price;
  this.category = product.category;
  this.subcategory = product.subcategory;
  this.promotion = product.promotion;
  this.hasVariant = product.hasVariant;
};

Product.create = (product, result) => {
  connection.query("INSERT INTO product SET ?", product, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, product.id);
  });
};

Product.getAll = (filters, result) => {
  if (Object.keys(filters).length !== 0) {
    connection.query("SELECT * FROM product WHERE ?", filters, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    })
  } else {
    connection.query("SELECT * FROM product", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        console.log(res);
        return;
      }
      result(null, res);
    })
  }
};

Product.findById = (productId, result) => {
  connection.query("SELECT * FROM product WHERE id = ?", productId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({
      status: "not_found"
    }, null);
  });
};

Product.updateById = (id, product, result) => {
  connection.query(
    `UPDATE product SET name = ?, description = ?, price = ?, category = ?, 
     subCategory = ?, promotion = ? WHERE id = ?`,
    [product.name, product.description, product.price, product.category,
      product.subCategory, product.promotion
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({
          "status": "not_found"
        }, null);
        return;
      }

      console.log("updated product: ", {
        id: id,
        product
      });
      result(null, {
        id: id,
        product
      });
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
        result({
          status: "not_found"
        }, null);
        return;
      }

      console.log("updated product: ", {
        id: id,
        product
      });
      result(null, {
        id: id,
        product
      });
    }
  );
};

module.exports = Product;