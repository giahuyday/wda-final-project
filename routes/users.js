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

router.get("/api/username", (req, res, next) => {
  const username = req.query.username;

  // Kiểm tra xem username có được cung cấp không
  if (!username) {
    return res.status(400).send("Missing username parameter");
  }

  connection.query(
    "SELECT username FROM Account WHERE username = ?",
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

router.post("api/checkout", (req, res, next) => {
  const data = req.body
  console.log(data)
})

router.get("/api/email", (req, res, next) => {
  const email = req.query.email;

  // Kiểm tra xem username có được cung cấp không
  if (!email) {
    return res.status(400).send("Missing username parameter");
  }

  connection.query(
    "SELECT email FROM Account WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Internal Server Error");
      }

      if (result.length > 0) {
        res.status(200).send("Mail is used");
      } else {
        res.status(200).send("Valid Mail");
      }
    }
  );
});

router.post("/api/write_review/:id", (req, res, next) => {
  const product_id = req.params.id;
  const user_id = req.user.id;
  const review_content = req.body.review;
  console.log(product_id, user_id, review_content);
  connection.query(
    "CALL Add_Review(?, ?, ?)",
    [user_id, product_id, review_content],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        connection.query(
          "SELECT * FROM Review WHERE Review.product_id = ?", [1],
          (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log(results);
            res.status(200).send(results);
          }
        );
      }
    }
  );
});

router.get("/api/product_reviews/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query("SELECT * FROM Review WHERE Review.product_id = ?"),
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
      }
      if (result.length > 0) {
        res.status(200).send(result);
        res.json(result);
      } else {
        res.status(200).send("This product doesn't have any preview");
      }
    };
});

module.exports = router;
