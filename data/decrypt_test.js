var crypto = require("crypto");
const mysql = require("mysql");
// connect db bình thường
require("dotenv").config;

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "wad",
});
const password = "admin1";

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  // console.log(req.body)
  crypto.pbkdf2(
    password,
    salt,
    10000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err); // Use next to pass the error to the error-handling middleware
      }

      try {
        // Tạo mới user trong MongoDB
        connection.query(
          `CALL AddAccount(?, ?, ?, ?, ?, ?, ?)`,
          [
            "testing4",
            hashedPassword.toString("hex"),
            "tester4",
            "tester4@gmail.com",
            "",
            "",
            salt,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            }

            console.log(result);
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  );
}

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt.toString('hex'), 10000, 32, "sha256")
    .toString("hex");
  console.log(hashVerify, hash);
  return hash === hashVerify;
}

//46cb75ccd2108aafe339def715d9618d0b2b4c720f6de5f853004c550607dd65

const isValid = validPassword(
  "admin",
  "46cb75ccd2108aafe339def715d9618d0b2b4c720f6de5f853004c550607dd65",
  "08795e6aa10a2fff0675ee4b5f5f5224e34494dfd5a76079a6082cf25fcee1c1"
);

if (isValid) {
  console.log("valid password");
} else {
  console.log("wrong password");
}

// genPassword('admin')
