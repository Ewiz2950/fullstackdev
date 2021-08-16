const variantImage = require("../../models/product/variantImage.model.js");

exports.create = (variantId, imageId) => {

    if (!variantId || !imageId) {
        return new Promise((resolve, reject) => {
          reject('Empty content.')
        })
      };
    
    let promises = [];
    
    imageId.forEach(id => {
        promises.push(new Promise((resolve, reject) => {

            const variantimage = new variantImage ({
                variantId: variantId,
                imageId: id
            });

            variantImage.create(variantimage, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        }))
    });

    return Promise.all(promises);
}

exports.findVariantImageId = (variantId) => {
    if (!variantId) {
        return new Promise((resolve, reject) => {
            reject('Empty content.')
        })
    };

    return new Promise((resolve, reject) => {
        variantImage.getById(variantId, (err, data) => {
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
