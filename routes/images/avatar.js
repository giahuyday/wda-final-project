const express = require("express");
const { upload } = require("../../middleware/upload");
const userController = require("../../src/user/user.controller");
const productController = require("../../src/product/product.controller");
const multer = require("multer");
const { isAuth } = require("../../middleware/auth");
const router = express.Router();
require("dotenv").config();

router.post(
  "/api/upload_avatar",
  isAuth,
  upload.array("file"),
  userController.updateUserAvatar
);

router.post(
  "/api/update_product_images",
  isAuth,
  upload.array("file"),
  productController.createProductImages
);

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "file limit reach",
      });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "file must be an image",
      });
    }
  }
});

module.exports = router;
