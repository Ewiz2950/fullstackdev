const connection = require('../../config/connection.js')

// constructor
const Image = function(image) {
  this.id = image.id;
  this.imageName = image.imageName;
};

Image.create = (image, result) => {
  connection.query("INSERT INTO image SET ?", image, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, image.id);
  });
};

Image.findById = (imageId, result) => {
  connection.query(
    "SELECT * FROM image WHERE id = ?", imageId,
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      result(null, res[0].imageName);
      return;
    }

    // not found Variant with the id
    result({ status: "not_found" }, null);
  });
};

module.exports = Image;
