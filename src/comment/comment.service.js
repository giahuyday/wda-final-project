const promiseConnection = require("../../routes/connection");

const createComment = async (user_id, product_id, content) => {
  const [rows, fields] = await promiseConnection.query(
    "INSERT INTO comment (user_id, product_id, content) VALUES (?, ?, ?)",
    [user_id, product_id, content]
  );

  return rows;
};

const getCommentByProductId = async (product_id) => {
  const [rows, fields] = await promiseConnection.query(
    "SELECT * FROM comment WHERE product_id = ?",
    [product_id]
  );

  return rows;
};

module.exports = {
  createComment,
  getCommentByProductId,
};
