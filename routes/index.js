const express = require("express");
const router = express.Router();
const connection = require("./connection");
const productControllers = require("../src/product/product.controller");
const categoryController = require("../src/category/category.controller");

/* GET home page. */
router.get("/", productControllers.getProducts);

router.get("/category", categoryController.getCategories);

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
