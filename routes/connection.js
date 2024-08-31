require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

const promiseConnection = connection.promise(); // Convert to promise-based

module.exports = promiseConnection;
