const express = require("express");
const { isAuth } = require("../middleware/auth");
const router = express.Router();
const crypto = require("crypto");
const { connect } = require("./connection");
const update_password = require("../src/auth/auth.service").update_password;

router.get("/my_account", isAuth, function (req, res, next) {
  console.log(req.user.id);
  connection.query(
    "SELECT * FROM Account WHERE id = ?",
    [req.user.id],
    (err, result) => {
      if (err) {
        res.render(err);
        res.send("Failed !");
      } else {
        console.log(result);
        res.render("auth/profile", { title: "My Profile", data: result });
      }
    }
  );
});

router.get("/my_ordered", isAuth, function (req, res, next) {
  console.log(req.user.id);
  const sorted = req.query.sorted;
  if (sorted === "decrease") {
    connection.query(
      "SELECT * FROM __Order, Product WHERE __Order.account_id = ? AND Product.id = __Order.product_id ORDER BY __Order.created_at DESC",
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
  else if (sorted === "status"){
    connection.query("SELECT * FROM __Order, Product WHERE __Order.account_id = ? AND Product.id = __Order.product_id ORDER BY __Order.order_status", [req.user.id],(err, result) => {
      if(err){
        console.log(err)
      }
      else{
        console.log(result)
        res.render("auth/order_list", {
          title: "Order History",
          data: result
        })
      }
    })
  } 
  else {
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
