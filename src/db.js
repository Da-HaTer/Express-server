const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Export the pool for use in other modules
module.exports = pool.promise();
