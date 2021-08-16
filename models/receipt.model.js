const connection = require('../config/connection.js')

//constructor
const Receipt = function(receipt) {
  this.name = receipt.name;
  this.email = receipt.email;
  this.adr = receipt.adr;
  this.zip = receipt.zip;
  this.card = receipt.card;
  this.cname = receipt.cname;
  this.ccnum = receipt.ccnum;
  this.item = receipt.item;
  this.total = receipt.total;
};

Receipt.create = (receipt, result) => {
    connection.query("INSERT INTO receipt SET ?", receipt, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created receipt: ", { id: receipt.name, 
        email: receipt.email, adr: receipt.adr, zip: receipt.zip, cname: receipt.cname,
        ccnum: receipt.ccnum, item: receipt.item, total: receipt.total});
      result(null, res);
    });
};
module.exports = Receipt;