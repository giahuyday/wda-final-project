const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'wad_dbms',
});

const promiseConnection = connection.promise(); // Convert to promise-based

module.exports = promiseConnection;