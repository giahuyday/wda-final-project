const express = require("express");
const { upload } = require("../../middleware/upload");
const multer = require("multer");
const { s3Uploadv2 } = require("../../src/images/aws.s3.service");
const router = express.Router();
require("dotenv").config();

router.post("/api/upload_image", upload.single("file"), (req, res) => {
  return res.json({ status: "success" });
});

router.post("/api/upload_images", upload.array("file"), async (req, res) => {
  try {
    const results = await s3Uploadv2(req.files);
    res.json({ status: "success", results });
  } catch (error) {
    console.log(error);
  }
});

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
