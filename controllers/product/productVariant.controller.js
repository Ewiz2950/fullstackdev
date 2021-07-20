const productVariant = require("../../models/product/productVariant.model.js");

exports.create = (productId, variantId) => {

    if (!productId || !variantId) {
        return new Promise((resolve, reject) => {
          reject('Empty content.')
        })
      };
    
    let promises = [];
    
    variantId.forEach(id => {
        promises.push(new Promise((resolve, reject) => {

            var productvariant = new productVariant ({
                productId: productId,
                variantId: id
            });

            productVariant.create(productvariant, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        }))
    });

    return Promise.all(promises);
}

exports.findVariantId = (productId) => {
    if (!productId) {
        return new Promise((resolve, reject) => {
            reject('Empty content.')
        })
    };

    return new Promise((resolve, reject) => {
        productVariant.getById(productId, (err, data) => {
            if (err) {
                if (err.status === "not_found") {
                  resolve()
                } else {
                  reject(err)
                }
              } else resolve(data);
        });
    })
}
