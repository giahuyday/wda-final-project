const promiseConnection = require("../../routes/connection");
const crypto = require("crypto");

const changePassword = (user_id, newPassword) => {
  const salt = crypto.randomBytes(32).toString("hex");
  crypto.pbkdf2(
    newPassword,
    salt,
    10000,
    32,
    "sha256",
    async (err, hashedPassword) => {
      const [rows, fields] = await promiseConnection.query(
        "UPDATE user SET user_password = ?, salt = ? WHERE user.id = ?",
        [hashedPassword.toString("hex"), salt.toString("hex"), user_id]
      );
      console.log(rows);
      return rows[0];
    }
  );
};

module.exports = {
  changePassword,
};
