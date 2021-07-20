const Review = require("../models/review.model.js");

exports.create = (req) => {
    return new Promise((resolve, reject) => {
        // Validate request
        if (!req) {
            reject("Empty content.")
        }
        // Create a Review
        const review = new Review({
            product_id: req.main.product_id,
            name: req.main.name,
            description: req.main.description,
            price: req.main.price,
            category: req.main.category,
            subCategory: req.main.subCategory,
            promotion: req.main.promotion
        });

        // Save Product in the database
        Review.create(review, (err, data) => {
            if (err) reject(err)
            else resolve()
        })
    })
};
exports.connect(function(err){
    if (err) throw err;
    console.log("Connected to review!")
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted"); 
    });

});

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    Review.getAll((err, data) => {
        if (err) {
            return (err)
        } else return(data);
    });
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
    Review.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.status === "not_found") {
                return `Product with id ${req.params.productId} not found.`;
            } else return (err)
        } else return(data);
    });
};

// Update a Product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req) {
        return "Content can not be empty."
    }

    Review.updateById(
        req.params.productId,
        new Review(req.body),
        (err, data) => {
            if (err) {
                if (err.status === "not_found") {
                    return `Product with id ${req.params.productId} not found.`;
                } else return (err)
            } else return(data);
        }
    );
};