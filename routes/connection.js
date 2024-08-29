const mysql = require('mysql2');

module.exports = connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'wad_dbms',
  // Other options like SSL if needed
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});
