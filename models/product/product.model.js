const connection = require('../../config/connection.js')

// constructor
const Product = function (product) {
  this.id = product.id;
  this.name = product.name;
  this.quantity = product.quantity;
  this.brand = product.brand;
  this.description = product.description;
  this.price = product.price;
  this.category = product.category;
  this.subcategory = product.subcategory;
  this.promotion = product.promotion;
  this.hasVariant = product.hasVariant;
  this.imageName = product.imageName;
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
  if (filters.search) {
    var search = filters.search;
    delete filters.search;
    if (Object.keys(filters).length > 0) {
      var sql = "SELECT * FROM product WHERE";
      for (var attribute in filters) {
        sql += ` ${attribute} = '${filters[attribute]}' AND`
      }
      sql += " name LIKE ?";
      connection.query(sql, ("%" + search + "%"), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        result(null, res);
      })
    }
    else {
      connection.query("SELECT * FROM product WHERE name LIKE ?", ("%" + search + "%"), (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        result(null, res);
      })
    }
  }
  else if (Object.keys(filters).length !== 0) {
    var sql = "SELECT * FROM product WHERE";
    for (var attribute in filters) {
      if (Object.keys(filters).indexOf(attribute) == Object.keys(filters).length - 1) {
        sql += ` ${attribute} = '${filters[attribute]}'`
      } else {
        sql += ` ${attribute} = '${filters[attribute]}' AND`
      }
    }
    connection.query(sql, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    })
  }  
  else {
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

Product.updateById = (product, result) => {
  connection.query(
    `UPDATE product SET description = ?, price = ?, category = ?, 
     subcategory = ?, promotion = ?, quantity = ?, brand = ?, hasVariant = ?, name = ? WHERE id = ?`,
    [product.description, product.price, product.category,
     product.subcategory, product.promotion, product.quantity, product.brand, product.hasVariant, product.name,
     product.id
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

      result(null, product.id);
    }
  );
};

Product.updateImageById = (product, result) => {
  connection.query(
    `UPDATE product SET imageName = ? WHERE id = ?`,
    [product.imageName, product.id],
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

      result(null, product.id);
    }
  );
};

Product.setListing = (id, listing, result) => {
  connection.query(
    "UPDATE product SET listed = ? WHERE id = ?", [listing, id],
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

      result(null, res);
    }
  );
};

module.exports = Product;