const Receipt = require("../models/receipt.model.js");

exports.create = (req) => {

    return new Promise((resolve, reject) => {
        // Validate request
        if (!req) {
            reject("Empty content.")
        }
        // Create a Receipt
        const receipt = new Receipt({
            name: req.main.name,
            email: req.main.email,
            adr: req.main.adr,
            zip: req.main.zip,
            card: req.main.card,
            cname: req.main.came,
            ccnum: req.main.ccnum,
            item: req.main.item,
            total: req.main.total
        });

        
        // Save in the database
        Receipt.create(receipt, (err, data) => {
            if (err) reject(err)
            else resolve()
        })
    })
}; 
exports.findAll = (req, res) => {
    Receipt.getAll((err, data) => {
        if (err) {
            return (err)
        } else return(data);
    });
};