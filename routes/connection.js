const mysql = require("mysql");
require("dotenv").config();

module.exports = connection = mysql.createConnection({
  host: "db4free.net",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

connection.connect((error) => {
  if (error) {
    console.error("Lỗi kết nối đến cơ sở dữ liệu:", error);
    return;
  }
  console.log("Đã kết nối thành công đến cơ sở dữ liệu MySQL");
});
