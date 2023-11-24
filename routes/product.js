const connection = require("./connection");
const express = require("express");
const router = express.Router();

router.get("/product-detail", function (req, res, next) {
  connection.query(
    "SELECT * FROM product, image WHERE product.id = image.product_id AND product.id = 1",
    (err, result) => {
      if (err) {
        res.render(err);
        res.send("Failed !");
      } else {
        console.log(result);
        // res.send(result);
        // res.render()
        // res.render("product/", { data: result });
        res.render('product', {data: result})
      }
      // res.send(result)
    }
  );
});

router.post("/create_product", function (req, res, next) {
  console.log(req.body);
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const category = req.body.category;
  const urls = req.body.urls;

  connection.query(
    `CALL AddProduct(?,?,?,?,?)`,
    [name, price, description, category, quantity],
    (error, results, fields) => {
      if (error) {
        console.error("Error calling the stored procedure:", error);
        res.render("Error calling the stoer procedure");
        return;
      }
      const result = Object.values(results[0][0])[0];
      if (results === 0) {
        console.log("Category or producer is wrong.");
      } else {
        console.log(results);
        console.log("New Item created. New id is: ", result);
        connection.query(
          "CALL Add_ProductPicture(?,?)",
          [result, urls],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(results);
            }
          }
        );
      }
    }
  );
});

router.get('/cart', function(req, res, next){
  // res.render('cart', {
  //   title: "Cart"
  // })

  connection.query("SELECT * FROM cart, account, product, image WHERE account.id = cart.account_id and product.id = cart.product_id and product.id = image.product_id", (err, result) => {
    if (err) {
      res.render(err);
      res.send("Failed !");
    } else {
      console.log(result);
      res.render('cart', {data: result})
    }
    
  })
})
module.exports = router;
