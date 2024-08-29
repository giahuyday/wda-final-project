const connection = require("../connection");
const express = require("express");
const categoryController = require("../../src/category/category.controller");
const productController = require("../../src/product/product.controller");
const router = express.Router();

router.get("/product-detail/:id", function (req, res, next) {
  connection.query(
    "SELECT * FROM Product, Image WHERE Product.id = Image.product_id AND Product.id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.render(err);
        res.send("Failed !");
      } else {
        console.log(result);
        res.render("product", { data: result });
      }
    }
  );
});

// Endpoint API để xử lý yêu cầu POST từ client
router.get("/api/search", function (req, res) {
  // console.log(req.query.query);
  connection.query(
    "SELECT Product.*, Image.urls FROM Product, Category, Image WHERE Product.category_id = Category.id AND Product.id = Image.product_id AND Category.catename = ?",
    [req.query.query],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        console.log(res.values);
        res.render("product/search", { data: result });
      }
    }
  );
});

// Endpoint API để xử lý yêu cầu GET từ client
router.get("/filter/:category", function (req, res) {
  const category = req.params.category;
  connection.query(
    "SELECT Product.*, Image.urls FROM Product, Category, Image WHERE Product.category_id = Category.id AND Product.id = Image.product_id AND Category.catename = ?",
    [category],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        console.log(res.values);
        res.render("product/search", { data: result });
      }
    }
  );
});

router.post("/api/create_product", productController.createProduct);
router.post("/api/update_product", productController.updateProduct);
router.post("/api/delete_product", productController.deleteProduct);

router.get("/cart", function (req, res, next) {
  if (req.user) {
    connection.query(
      `SELECT * FROM Cart, Product, Image WHERE Cart.account_id = '${req.user.id}' and Product.id = Cart.product_id and Product.id = Image.product_id`,
      (err, result) => {
        if (err) {
          res.render(err);
          res.send("Failed !");
        } else {
          console.log(result);
          res.render("cart", { data: result });
        }
      }
    );
  } else {
    res.render("cart", { title: "Cart" });
  }
});

router.post("/api/addtocart/:id", function (req, res, next) {
  const product_id = req.params.id;

  connection.query(
    "CALL Add_Product2Cart(?, ?)",
    [req.user.id, product_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      res.json("Add to Cart success");
    }
  );
});

router.get("/api/filterproduct", function (req, res) {
  // Lấy các tham số tìm kiếm từ query string
  const productName = req.query.query;

  // Tạo câu truy vấn SQL cơ bản
  let sqlQuery =
    "SELECT * FROM Product, Image, Category WHERE Image.product_id = Product.id AND Product.category_id = Category.id";

  // Tạo mảng các điều kiện tìm kiếm
  const searchConditions = [];

  // Thêm điều kiện tìm kiếm cho tên sản phẩm
  if (productName) {
    searchConditions.push(`Product.name LIKE "%${productName}%"`);
  }

  // Thêm điều kiện tìm kiếm cho danh mục
  // if (category) {
  //   searchConditions.push(`" AND Category.catename LIKE ""%${category}%"`);
  // }
  console.log(searchConditions);
  // Thêm điều kiện tìm kiếm cho giá
  // if (minPrice && maxPrice) {
  //   searchConditions.push(
  //     `Product.price BETWEEN ${parseFloat(minPrice)} AND ${parseFloat(
  //       maxPrice
  //     )}`
  //   );
  // } else if (minPrice) {
  //   searchConditions.push(`Product.price >= ${parseFloat(minPrice)}`);
  // } else if (maxPrice) {
  //   searchConditions.push(`Product.price <= ${parseFloat(maxPrice)}`);
  // }

  // Nếu có điều kiện tìm kiếm, thêm vào câu truy vấn SQL
  if (searchConditions.length > 0) {
    sqlQuery += ` AND ${searchConditions.join("")}`;
  }
  console.log(sqlQuery);
  // Thực hiện truy vấn SQL
  connection.query(sqlQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const filteredProducts = result;
      console.log(filteredProducts);
      res.send(filteredProducts);
    }
  });

  // Thực hiện việc lọc sản phẩm dựa trên các tham số tìm kiếm

  // Trả về danh sách sản phẩm đã lọc
});

router.post("/api/create_category", categoryController.createCategory);
router.post("/api/update_category", categoryController.updateCategory);
router.post("/api/delete_category", categoryController.deleteCategory);

module.exports = router;
