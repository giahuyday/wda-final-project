const express = require("express");
const { isAuth } = require("../../middleware/auth");
const router = express.Router();
const crypto = require("crypto");
const { connect } = require("../connection");
const update_password = require("../../src/auth/auth.service").update_password;
const promiseConnection = require("../connection");

router.get("/my_account", isAuth, async function (req, res, next) {
  const [rows, fields] = await promiseConnection.query(
    "SELECT * FROM product WHERE id = ?",
    [req.user]
  );
  console.log(rows);
  res.render("auth/profile", { title: "My Profile", data: rows });
});

router.get("/my_ordered", isAuth, function (req, res, next) {
  const sorted = req.query.sorted;
  if (sorted === "decrease") {
    connection.query(
      "SELECT * FROM __Order, Product WHERE __Order.account_id = ? AND Product.id = __Order.product_id ORDER BY __Order.created_at DESC",
      [req.user],
      (err, result) => {
        if (err) {
          res.status(err).send(err);
        } else {
          console.log("Success");
          res.render("auth/order_list", {
            title: "Order History",
            data: result,
          });
        }
      }
    );
  } else if (sorted === "status") {
    connection.query(
      "SELECT * FROM __Order, Product WHERE __Order.account_id = ? AND Product.id = __Order.product_id ORDER BY __Order.order_status",
      [req.user.id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.render("auth/order_list", {
            title: "Order History",
            data: result,
          });
        }
      }
    );
  } else {
    connection.query(
      "SELECT * FROM __Order, Product WHERE __Order.account_id = ? AND Product.id = __Order.product_id",
      [req.user.id],
      (err, result) => {
        if (err) {
          res.status(err).send(err);
        } else {
          console.log("Success");
          res.render("auth/order_list", {
            title: "Order History",
            data: result,
          });
        }
      }
    );
  }
});

router.get("/pass", function (req, res, next) {
  if (req.isAuthenticated) {
    res.render("password");
  } else {
    res.redirect("/auth/login");
  }
});

router.get("/api/pass", function (req, res, next) {
  if (req.isAuthenticated) {
    const id = req.user.id;
    const new_pass = req.query.password;
    console.log(id);
    var hashVerify = crypto
      .pbkdf2Sync(new_pass, req.user.salt, 10000, 32, "sha256")
      .toString("hex");
    // console.log(hash, hashVerify);
    if (hashVerify === req.user.password) {
      res.status(200).send("valid");
    } else {
      res.status(200).send("Wrong");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/api/repass", function (req, res, next) {
  if (req.isAuthenticated) {
    const salt = req.user.salt;
    const userId = req.user.id;
    const password = req.body.password;

    console.log(req.body);
    console.log(salt);
    console.log(userId);
    console.log(password);

    crypto.pbkdf2(
      password,
      salt,
      10000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (err) {
          console.log(err);
        }
        try {
          connection.query(
            "UPDATE Account SET password = ? WHERE id = ?",
            [hashedPassword.toString("hex"), userId],
            (err, result) => {
              if (err) {
                console.error(err);
              } else {
                console.log(result);
              }
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
    );
  } else {
    res.redirect("/login");
  }
});

router.post("/api/update", isAuth, function (req, res, next) {
  // res.json("Con me may");
  console.log(req.body);
  connection.query(
    "UPDATE Account SET  username = ?, password = ?, name = ?, address = ?, phone = ?, email = ?",
    [
      req.body.username,
      req.body.password,
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.email,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

module.exports = router;
