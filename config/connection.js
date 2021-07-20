const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
  });

connection.connect( (error) => {
  if (error) {
    console.log("Failed to connect to database.")
    process.exit(1);
  } else {
    console.log("Database connected!")
  }
});

module.exports = connection;
