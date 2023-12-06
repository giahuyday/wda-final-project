const connection = require("./connection");
const express = require("express");
const router = express.Router();

router.get("/product-detail/:id", function (req, res, next) {
  connection.query(
    "SELECT * FROM Product, Image WHERE Product.id = Image.product_id AND Product.id = ?", [req.params.id],
    (err, result) => {
      if (err) {
        res.render(err);
        res.send("Failed !");
      } else {
        console.log(result);
        res.render('product', {data: result})
      }
    }
  );
});

// Endpoint API để xử lý yêu cầu POST từ client
router.post('/api/search', (req, res) => {
  const category = req.body.category;
  console.log(category);

  res.json('success')
});

// Endpoint API để xử lý yêu cầu GET từ client
router.get('/search/:category', (req, res) => {
  const category = req.params.category;
  connection.query('SELECT Product.*, Image.urls FROM Product, Category, Image WHERE Product.category_id = Category.id AND Product.id = Image.product_id AND Category.name = ?', [category], (err, result) => {
    if(err){
      res.json(err)
    }
    else{
      console.log(res.values)
      res.render('product/search', {data: result})
    }
  })
});

router.post("/api/create_product", function (req, res, next) {
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
  if(req.user){
    connection.query(`SELECT * FROM Cart, Product, Image WHERE Cart.account_id = '${req.user.id}' and Product.id = Cart.product_id and Product.id = Image.product_id`, (err, result) => {
      if (err) {
        res.render(err);
        res.send("Failed !");
      } else {
        console.log(result);
        res.render('cart', {data: result})
      }
      
    })
  }
  else{
    res.render('cart', {title: 'Cart'})
  }
})


router.post('/api/addtocart/:id', (req, res, next) => {
  const product_id = req.params.id

  connection.query('CALL Add_Product2Cart(?, ?)', [req.user.id, product_id], (err, result) => {
    if(err){
      console.log(err)
    }

    res.json("Add to Cart success")
  })
})

module.exports = router;
