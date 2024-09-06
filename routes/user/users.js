const express = require("express");
const router = express.Router();
require("dotenv").config;
require("../../middleware/passport");
const userControllers = require("../../src/user/user.controller");
const passwordControllers = require("../../src/password/password.controller");
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

router.get("/cart", (req, res, next) => {
  res.render("cart", { title: "Cart" });
});

router.get("/checkout", (req, res, next) => {
  res.render("product/checkout", {title: "Checkout"})
})

router.post("/api/change_password", isAuth, passwordControllers.changePassword);

router.post("/api/get_user_by_name", userControllers.getUserByName);

router.post("/api/register", userControllers.createNewUser);

module.exports = router;
