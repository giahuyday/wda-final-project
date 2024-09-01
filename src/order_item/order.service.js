const promiseConnection = require("../../routes/connection");

const createOrder = async (user_id, total_price) => {
  const [rows, fields] = await promiseConnection.query(
    "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
    [user_id, total_price]
  );

  return rows;
};

module.exports = {
  createOrder,
};
