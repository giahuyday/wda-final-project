const promiseConnection = require("../../routes/connection");

const addToCart = async (user_id, product_id) => {
  const [rows, fields] = await promiseConnection.query(
    "INSERT INTO cart (user_id, prod_id, quantity) VALUES (?, ?, 1)",
    [user_id, product_id]
  );

  return rows[0];
};

const removeFromCart = async (cart_id) => {
  const [rows, fields] = await promiseConnection.query(
    "UPDATE cart SET is_deleted = 1 WHERE id = ?",
    [cart_id]
  );

  return rows[0];
};

const updateCartQuantiy = async (cart_id, quantity) => {
  const [rows, fields] = await promiseConnection.query(
    "UPDATE cart SET quantity = ? WHERE id = ?",
    [quantity, cart_id]
  );

  return rows[0];
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCartQuantiy,
};
