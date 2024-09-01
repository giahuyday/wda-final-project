const promiseConnection = require("../../routes/connection");

const addOrderItems = async (order_id, product_id, quantity) => {
  const [rows, fields] = await promiseConnection.query(
    "INSERT INTO order_item (order_id, product_id, quantity) VALUES (?, ?, ?)",
    [order_id, product_id, quantity]
  );

  return rows;
};

module.exports = {
  addOrderItems,
};
