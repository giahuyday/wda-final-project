const express = require("express");
const router = express.Router();
const connection = require("./connection");
/* GET home page. */
router.get("/", function (req, res, next) {
  // Query data from MySQL
  connection.query(
    "SELECT * FROM Product, Image WHERE Product.id = Image.product_id",
    (error, results) => {
      console.log(results);
      if (error) {
        console.error("Error querying database:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Render the page with data from MySQL
      res.render("index", {
        data: results,
        title: "Home Page",
      });
    }
  );
});

router.get("/category", function (req, res, next) {
  connection.query("SELECT * FROM Category", (error, results) => {
    console.log(results);
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Render the page with data from MySQL
    res.json({ data: results });
  });
});

router.get("/checkout", function (req, res, next) {
  if (req.user) {
    connection.query(
      `SELECT Product.*, Cart.*, Image.*, Account.id, Account.email, Account.phone, Account.address FROM Cart, Product, Account, Image WHERE Cart.account_id = '${req.user.id}' and Account.id = Cart.account_id and Product.id = Cart.product_id and Product.id = Image.product_id`,
      (err, result) => {
        if (err) {
          res.render(err);
          res.send("Failed !");
        } else {
          console.log(result);
          res.render("product/checkout", { data: result });
          // res.json(result)
        }
      }
    );
  } else {
    res.json("Hello World");
  }
});

module.exports = router;
