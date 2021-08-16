const connection = require('../config/connection.js')

// constructor
const Review = function(review) {
    this.review_id = review.review_id
    this.product_id = review.product_id
    this.reviewStar = review.reviewStar
    this.reviewText = review.reviewText
};

Review.create = (review, result) => {
    connection.query("INSERT INTO review SET ?", review, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result = (err, null);
        return;
      }
      console.log("created review: ", { review_id: review.review_id, product_id: review.product_id, reviewStar: review.reviewStar, reviewText: review.reviewText });
      result = (res);
    });
  };
  
Review.findById = (productId, result) => {
    connection.query(`SELECT * FROM review WHERE product_id = ${productId}`, (err, res) => {
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
  
// Review.getAll = result => {
//     connection.query("SELECT * FROM customers", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//       console.log("customers: ", res);
//       result(null, res);
//     });
//   };
  
Review.updateById = (id, product, result) => {
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
  
Review.setListing = (id, product, listing, result) => {
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
  
module.exports = Review;