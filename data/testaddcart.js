var crypto = require('crypto')
const mysql = require('mysql');
// connect db bình thường 
require('dotenv').config

const connection = mysql.createConnection({
  host: 'db4free.net',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

const account_id = 4
const product_id = 2


connection.connect()

const callProcedure = `CALL Add_Product2Cart('${account_id}', '${product_id}')`;

connection.query(callProcedure, (error, results, fields) => {
    if (error) {
      console.error('Error calling the stored procedure:', error);
      return;
    }else{
        console.log(results)
    }
  });

connection.end()