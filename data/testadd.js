const mysql = require('mysql');
// connect db bình thường 
require('dotenv').config

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'wad',
});
;

// trước khi chạy chuẩn bị các input như sau 
const itemName = 'Laptop test';
const itemPrice = 150000;
const itemDescription = 'i3-1115G4/ RAM 8GB/ 256GB SSD/ Windows 11';
const category = 1;  
const quantity = 10;

connection.connect()

const callProcedure = `CALL AddItem('${itemName}', '${itemPrice}', '${itemDescription}', '${category}', '${quantity}')`;

connection.query(callProcedure, (error, results, fields) => {
    if (error) {
      console.error('Error calling the stored procedure:', error);
      return;
    }

    const result = Object.values(results[0][0])[0];

    if (result === 0) {
        console.log('Category or producer is wrong.');
        } else  {
          console.log('New Item created. New id is: ',result );
        }
  });

connection.end()