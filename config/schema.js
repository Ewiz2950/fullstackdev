let createProduct = `CREATE TABLE IF NOT EXISTS product (
                        product_id VARCHAR(36) PRIMARY KEY NOT NULL, 
                        name VARCHAR (255) NOT NULL, 
                        description VARCHAR (1000) NOT NULL,
                        price DECIMAL (10,2) NOT NULL,
                        listed BOOLEAN SET DEFAULT true;
                     )`

let createImage = `CREATE TABLE IF NOT EXISTS image (
                        variant_id VARCHAR(36) NOT NULL, 
                        product_id VARCHAR (36) NOT NULL,
                        image VARCHAR(50) NOT NULL,
                        FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE CASCADE,
                        FOREIGN KEY (variant_id) REFERENCES variant (variant_id) ON DELETE CASCADE,
                        PRIMARY KEY (variant_id, product_id)
                   )`;

let createVariant = `CREATE TABLE IF NOT EXISTS variant (
                        variant_id VARCHAR(36) NOT NULL,
                        product_id VARCHAR(36) NOT NULL,
                        name VARCHAR (255) NOT NULL,
                        FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE CASCADE,
                        PRIMARY KEY (variant_id, product_id)
                     )`

module.exports = {createProduct, createVariant, createImage};
