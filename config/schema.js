let createProduct = `CREATE TABLE IF NOT EXISTS product (
                        product_id VARCHAR(36) PRIMARY KEY NOT NULL, 
                        name VARCHAR (255) NOT NULL, 
                        description VARCHAR (1000) NOT NULL,
                        price DECIMAL (10,2) NOT NULL,
                        category VARCHAR (20) NOT NULL,
                        subCategory VARCHAR(15) NOT NULL,
                        promotion VARCHAR(20) NOT NULL,
                        listed BOOL DEFAULT true NOT NULL
                     )`;

let createImage = `CREATE TABLE IF NOT EXISTS image (
                        variant_id VARCHAR(36) NOT NULL, 
                        product_id VARCHAR (36) NOT NULL,
                        image VARCHAR(50) NOT NULL,
                        FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE CASCADE,
                        FOREIGN KEY (variant_id) REFERENCES variant (variant_id) ON DELETE CASCADE,
                        PRIMARY KEY (variant_id, image)
                   )`;

let createVariant = `CREATE TABLE IF NOT EXISTS variant (
                        variant_id VARCHAR(36) NOT NULL,
                        product_id VARCHAR(36) NOT NULL,
                        name VARCHAR (255) NOT NULL,
                        FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE CASCADE,
                        PRIMARY KEY (variant_id, product_id)
                     )`

let createReceipt = `CREATE TABLE IF NOT EXISTS receipt (
                        name VARCHAR(30) PRIMARY KEY NOT NULL,
                        email VARCHAR(50) NOT NULL,
                        adr VARCHAR(60) NOT NULL,
                        zip VARCHAR(6) NOT NULL,
                        card VARCHAR(15) NOT NULL,
                        cname VARCHAR(30) NOT NULL,
                        ccnum VARCHAR(19) NOT NULL,
                        item VARCHAR(30) NOT NULL,
                        total VARCHAR(10) NOT NULL
)`

module.exports = {createProduct, createVariant, createImage, createReceipt};
