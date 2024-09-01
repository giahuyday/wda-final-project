const { nextTick } = require("process");
const promiseConnection = require("../../routes/connection");
const avatarService = require("../images/image.service");
const avatarController = require("../images/image.controller");
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

const getUserByName = async (user_name) => {
  const [rows, fields] = await promiseConnection.query(
    "SELECT * FROM user WHERE user.user_name = ?",
    [user_name]
  );

  return JSON.stringify(rows[0]);
};

const createNewUser = async (req, res, next) => {
  const salt = crypto.randomBytes(32).toString("hex");
  console.log(req.body);
  crypto.pbkdf2(
    req.body.user_password,
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
        const [rows, fields] = await promiseConnection.query(
          `
            INSERT INTO user (user_name, user_password, user_mail, phone, user_address, salt)
            VALUES (?, ?, ?, ?, ?, ?);`,
          [
            req.body.user_name,
            hashedPassword.toString("hex"),
            req.body.user_mail,
            "",
            "",
            salt.toString("hex"),
          ]
        );
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );
};

const updateUserAvatar = async (file) => {
  const urls = await avatarController.uploadImage(file);

  return urls;
};

module.exports = {
  changePassword,
  getUserByName,
  createNewUser,
  updateUserAvatar,
};
