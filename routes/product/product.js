const connection = require("../connection");
const express = require("express");
const categoryController = require("../../src/category/category.controller");
const productController = require("../../src/product/product.controller");
const router = express.Router();

// Endpoint API để xử lý yêu cầu GET từ client
router.post("/filter", productController.getProductByCategory);

router.post("/api/create_product", productController.createProduct);
router.post("/api/update_product", productController.updateProduct);
router.post("/api/delete_product", productController.deleteProduct);
router.post("/api/product/:id", productController.getProduct);

router.post("/api/create_category", categoryController.createCategory);
router.get("/api/get_category", categoryController.getCategory);
router.post("/api/update_category", categoryController.updateCategory);
router.post("/api/delete_category", categoryController.deleteCategory);

module.exports = router;
