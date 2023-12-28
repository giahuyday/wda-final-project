const express = require("express");
const router = express.Router();
require("dotenv").config;
require("../middleware/passport");
const connection = require("./connection");
const crypto = require("crypto");
require("../middleware/passport");
var passport = require("passport");
const isAuth = require("../middleware/auth").isAuth;

router.get("/login", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.json("You are logged in");
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
      if (err) {
        console.error(err);
        return next(err);
      }

      console.log("Authentication successful:", user.username);
      res.json("success"); // Thêm return ở đây
    });
  })(req, res, next); // Thêm () ở đây để gọi hàm authenticate
});

router.get("/signup", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.json("You are logged in and Cannot Register");
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
    req.body.password,
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
            req.body.username,
            hashedPassword.toString("hex"),
            req.body.username,
            req.body.email,
            "",
            "",
            salt.toString("hex"),
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.json(err); // Return to prevent further execution
            }

            res.redirect("/login");
          }
        );
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );
});

router.post("/api/write_review/:id", isAuth, (req, res, next) => {
  console.log(req);
  console.log(req.body);
  connection.query(
    "CALL Add_Review(?, ?, ?)",
    [req.user.id, req.params.id, req.body.review],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
