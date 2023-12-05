const mysql = require('mysql');
// connect db bình thường 


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'wad',
});
;

connection.connect()

// lấy các thông tin để tạo account
const username = 'huy_nguyen';
const password = 'bbbd801206408a197e4e0bcf387e8b963812d967ba7d1e82d8a204c343bd6529';
const name = 'Huy';
const email = '20127186@student.hcmus.edu.vn';
const phone = '123456789';
const address = '123 Main St';
const salt = '0ecd75d9dc27a5b0b6c9248b74b05314'

// tạo string gọi proc
const callProcedure = `CALL AddAccount('${username}', '${password}', '${name}', '${email}', '${phone}', '${address}', '${salt}')`;

// gọi querry bình thường
connection.query(callProcedure, (err, results, fields) => {
  if (err) throw err

  const result = Object.values(results[0][0])[0];

// trả về 1 nếu account đã tồn tại trả 0 nếu tạo thành công
  if (result === 1) {
  console.log('Username already exists.');
  } else if (result === 0) {
    console.log('New Account created:');
  }
})


connection.end()