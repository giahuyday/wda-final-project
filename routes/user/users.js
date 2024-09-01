const express = require("express");
const router = express.Router();
require("dotenv").config;
require("../../middleware/passport");
const promiseConnection = require("../connection");
const userControllers = require("../../src/user/user.controller");
const passwordControllers = require("../../src/password/password.controller");
const crypto = require("crypto");
require("../../middleware/passport");
var passport = require("passport");
const { isAuth } = require("../../middleware/auth");

router.get("/login", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.send(
      "<h1>Cannnot access site at this time because you are logged in</h1>"
    );
  } else {
    res.render("login", { title: "Login" });
  }
});

router.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: "Wrong",
  })
);

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

router.post("/api/change_password", isAuth, passwordControllers.changePassword);

router.post("/api/get_user_by_name", userControllers.getUserByName);

router.post("/api/register", userControllers.createNewUser);

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
