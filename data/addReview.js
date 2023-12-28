var crypto = require('crypto')
const mysql = require('mysql');
// connect db bình thường 
require('dotenv').config

const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'wad_dbms',
  password: 'wad_dbms',
  database: 'wad_dbms',
});

const account_id = 1
const product_id = 1
const review_content = "San pham nay hay lam"

connection.connect()

const callProcedure = `CALL Add_Review('${account_id}', '${product_id}', '${review_content}')`;

connection.query(callProcedure, (error, results, fields) => {
    if (error) {
      console.error('Error calling the stored procedure:', error);
      return;
    }else{
        console.log(results)
    }
  });

connection.end()