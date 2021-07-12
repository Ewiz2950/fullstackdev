const schema = require('./schema.js');
const connection = require('./connection.js');

connection.connect((err) => {
    if (err) {
        return console.log("error: " + err.message);
    } else {
        connection.query(schema.Product, function (err, results, fields) {
            if (err) {
                console.log("1 " + err.message);
            }
        });

        connection.query(schema.Variant, function (err, results, fields) {
            if (err) {
                console.log("2 " + err.message);
            }
        });

        connection.query(schema.Image, function (err, results, fields) {
            if (err) {
                console.log("3 " + err.message);
            }
        });

        connection.query(schema.productImage, function (err, results, fields) {
            if (err) {
                console.log("4 " + err.message);
            }
        });

        connection.query(schema.createReview, function (err, results, fields) {
            if (err) {
                console.log("5 " + err.message);
            }
        });

        connection.query(schema.createReceipt, function (err, results, fields) {
            if (err) {
                console.log("6 " + err.message);
            }
        });

        connection.query(schema.variantImage, function (err, results, fields) {
            if (err) {
                console.log("7 " + err.message);
            }
        });
        
        connection.query(schema.productVariant, function (err, results, fields) {
            if (err) {
                console.log("8 " + err.message);
            }
        });

        connection.query(schema.createReceipt, function (err, results, fields) {
            if (err) {
                console.log("9 " + err.message);
            }
        });
    }
});

module.exports = connection;