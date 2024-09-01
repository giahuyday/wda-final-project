const promiseConnection = require("../../routes/connection");

const createImages = async (url, user_id) => {
  const [rows, fields] = await promiseConnection.query(
    "INSERT INTO avatar (url, user_id) VALUES (?, ?)",
    [url, user_id]
  );

  return rows;
};

const createProductImages = async (url, product_id) => {
  const [rows, fields] = await promiseConnection.query(
    "INSERT INTO product_image (product_url, product_id) VALUES (?, ?)",
    [url, product_id]
  );

  return rows;
};

module.exports = {
  createImages,
  createProductImages,
};
