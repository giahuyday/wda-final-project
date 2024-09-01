const multer = require("multer");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});

const upload = multer({ storage });
const multipleUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "cover_image", maxCount: 1 },
]);

module.exports = { upload, multipleUpload };
