const express = require("express");
const router = express.Router();
require("dotenv").config;
require("../../middleware/passport");
const promiseConnection = require("../connection");
const crypto = require("crypto");
require("../../middleware/passport");
var passport = require("passport");

router.get("/login", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.send(
      "<h1>Cannnot access site at this time because you are logged in</h1>"
    );
  } else {
    res.render("login", { title: "Login" });
  }
});

router.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      // return next(err);
    }

    if (!user) {
      console.log("Authentication failed:", info.message);
      res.redirect("/login");
    }

    req.logIn(user, (err) => {
      console.log(user);
      if (err) {
        console.error(err);
        return next(err);
      }

      console.log("Authentication successful:", user.user_name);
      res.json("success"); // Thêm return ở đây
    });
  })(req, res, next); // Thêm () ở đây để gọi hàm authenticate
});

router.get("/signup", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.send(
      "<h1>Cannnot access site at this time because you are logged in</h1>"
    );
  } else {
    res.render("signup", { title: "SignUp" });
  }
});

router.post("/api/logout", (req, res, next) => {
  res.clearCookie("connect.sid"); // clear the session cookie
  req.logout(function (err) {
    // logout of passport
    req.session.destroy(function (err) {
      // destroy the session
      res.redirect("/");
    });
  });
});

router.post("/api/register", function (req, res, next) {
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
            INSERT INTO user (user_name, user_password, user_mail, phone, _useraddress, salt)
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

        res.redirect("/login");
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );
});

router.get("/api/username", (req, res, next) => {
  const username = req.query.username;

  // Kiểm tra xem username có được cung cấp không
  if (!username) {
    return res.status(400).send("Missing username parameter");
  }

  promiseConnection.query(
    "SELECT user_name FROM user WHERE user_name = ?",
    [username],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Internal Server Error");
      }

      if (result.length > 0) {
        res.status(200).send("Username is used");
      } else {
        res.status(200).send("Valid Username");
      }
    }
  );
});

module.exports = router;
