const express = require("express");
const { isAuth } = require("../../middleware/auth");
const categoryController = require("../../src/category/category.controller");
const productController = require("../../src/product/product.controller");
const cartController = require("../../src/cart/cart.controller");
const commentController = require("../../src/comment/comment.controller")
const orderController = require("../../src/order_item/order.controller")
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

router.post("/api/add_to_cart", isAuth, cartController.addToCart);
router.delete("/api/remove_from_cart", isAuth, cartController.removeFromCart);
router.post("/api/update_quantity", isAuth, cartController.updateCartQuantiy);

router.post("/api/create_comment", isAuth, commentController.createComment);
router.post("/api/get_product_comment", isAuth, commentController.getCommentByProductId);

router.post("/api/create_order", isAuth, orderController.createOrder);
router.post("/api/addOrderItems", isAuth, orderController.addOrderItems);

module.exports = router;
