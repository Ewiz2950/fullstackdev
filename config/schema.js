let Product = `CREATE TABLE IF NOT EXISTS product (
<<<<<<< HEAD
   id VARCHAR (36) PRIMARY KEY NOT NULL, 
   quantity INT (11) NOT NULL, 
   brand VARCHAR(30) NOT NULL,
   description VARCHAR (1000) NOT NULL,
   price DECIMAL (10,2) NOT NULL,
   category VARCHAR (20) NOT NULL,
   subcategory VARCHAR (15) NOT NULL,
   promotion VARCHAR (20) NOT NULL,
   hasVariant BOOL NOT NULL,
   listed BOOL DEFAULT true NOT NULL
)`;
=======
                  id VARCHAR (36) PRIMARY KEY NOT NULL, 
                  quantity INT (11) NOT NULL, 
                  brand VARCHAR(30) NOT NULL,
                  description VARCHAR (1000) NOT NULL,
                  price DECIMAL (10,2) NOT NULL,
                  category VARCHAR (20) NOT NULL,
                  subcategory VARCHAR (15) NOT NULL,
                  promotion VARCHAR (20) NOT NULL,
                  hasVariant BOOL NOT NULL,
                  listed BOOL DEFAULT true NOT NULL
               )`;
>>>>>>> a03b3c2a5141bc14e37b30708bdddc57379cf817

let Image = `CREATE TABLE IF NOT EXISTS image (
id VARCHAR (36) PRIMARY KEY NOT NULL,
imageName VARCHAR (50) NOT NULL
)`;

let Variant = `CREATE TABLE IF NOT EXISTS variant (
<<<<<<< HEAD
   id VARCHAR (36) PRIMARY KEY NOT NULL,
   name VARCHAR (255) NOT NULL,
   quantity INT (11) NOT NULL
   )`

let productVariant = `CREATE TABLE IF NOT EXISTS product_variant (
         productId VARCHAR (36) NOT NULL,
         variantId VARCHAR (36) NOT NULL,
         FOREIGN KEY (productId) REFERENCES product (id) ON DELETE CASCADE,
         FOREIGN KEY (variantId) REFERENCES variant (id) ON DELETE CASCADE,
         PRIMARY KEY (productId, variantId)
      )`


let variantImage = `CREATE TABLE IF NOT EXISTS variant_image (
      variantId VARCHAR (36) NOT NULL,
      imageId VARCHAR (36) NOT NULL,
      FOREIGN KEY (imageId) REFERENCES image (id) ON DELETE CASCADE,
      FOREIGN KEY (variantId) REFERENCES variant (id) ON DELETE CASCADE,
      PRIMARY KEY (variantId, imageId)
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
=======
                  id VARCHAR (36) PRIMARY KEY NOT NULL,
                  name VARCHAR (255) NOT NULL,
                  quantity INT (11) NOT NULL
                  )`

let productVariant = `CREATE TABLE IF NOT EXISTS product_variant (
                        productId VARCHAR (36) NOT NULL,
                        variantId VARCHAR (36) NOT NULL,
                        FOREIGN KEY (productId) REFERENCES product (id) ON DELETE CASCADE,
                        FOREIGN KEY (variantId) REFERENCES variant (id) ON DELETE CASCADE,
                        PRIMARY KEY (productId, variantId)
                     )`


let variantImage = `CREATE TABLE IF NOT EXISTS variant_image (
                     variantId VARCHAR (36) NOT NULL,
                     imageId VARCHAR (36) NOT NULL,
                     FOREIGN KEY (imageId) REFERENCES image (id) ON DELETE CASCADE,
                     FOREIGN KEY (variantId) REFERENCES variant (id) ON DELETE CASCADE,
                     PRIMARY KEY (variantId, imageId)
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
>>>>>>> a03b3c2a5141bc14e37b30708bdddc57379cf817
)`

let createReview = `CREATE TABLE IF NOT EXISTS review (
         review_id VARCHAR(30) PRIMARY KEY NOT NULL,
         product_id VARCHAR(36) NOT NULL,
         review_text VARCHAR(1000) NOT NULL,
         review_star VARCHAR(5) NOT NULL
)`

<<<<<<< HEAD
module.exports = { Product, Variant, Image, productVariant, variantImage, createReceipt, createReview };
=======
module.exports = { Product, Variant, Image, productVariant, variantImage, createReceipt, createReview };
>>>>>>> a03b3c2a5141bc14e37b30708bdddc57379cf817
