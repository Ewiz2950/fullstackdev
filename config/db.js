const schema = require('./schema.js');
const connection = require('./connection.js');

connection.connect((err) => {
  if (err) {
      return console.log("error: " + err.message);
  } else {
      console.log("Connected to the MySQL server.");
      connection.query(schema.createProduct, function (err, results, fields) {
          if (err) {
              console.log("1 " + err.message);
          }
      });
      connection.query(schema.createVariant, function (err, results, fields) {
          if (err) {
              console.log("2 " + err.message);
          }
      });
      connection.query(schema.createImage, function (err, results, fields) {
          if (err) {
              console.log("3 " + err.message);
          }
      });
      connection.query(schema.createReview, function (err, results, fields) {
        if (err) {
            console.log("4 " + err.message);
        }
     });
    }
});

module.exports = connection;