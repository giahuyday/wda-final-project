const crypto = require("crypto");
const mysql = require("mysql");

const config = require("dotenv").config;

const connection = mysql.createConnection({
  host: "db4free.net",
  user: "wad_dbms",
  password: "wad_dbms",
  database: "wad_dbms",
});

connection.connect();

// connection.query("SELECT * FROM Account", (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(res);
//   }
// });

function change_pass(id, new_pass, salt) {
  crypto.pbkdf2(
    new_pass,
    salt,
    10000,
    32,
    "sha256",
    async function (err, hashedPassword) {
        if(err){
            console.log(err)
        }
        try{
            connection.query(
              "UPDATE Account SET password = ? WHERE id = ?", [hashedPassword.toString("hex"), id],
              (err, result) => {
                if(err){
                    console.error(err)
                }
                else{
                    console.log(result)
                }
              }
              );
        }catch (err) {
          console.log(err);
      }})
}

change_pass(2, "123123", "08795e6aa10a2fff0675ee4b5f5f5224e34494dfd5a76079a6082cf25fcee1c1")

// connection.end();
