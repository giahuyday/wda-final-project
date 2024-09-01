const orderService = require("./order.service");
const itemService = require("./item.service");

const createOrder = async (req, res, next) => {
  try {
    const result = await orderService.createOrder(
      req.user,
      req.body.total_price
    );

    if (result.affectedRows === 0) {
      res.json({ message: "Make order failed" });
    }

    return res.status(200).json({ message: "create order success" });
  } catch (error) {
    console.log(error);
  }
};

const addOrderItems = async (req, res, next) => {
  try {
    const items = req.body.items;
    const result = await Promise.all(
      items.map((item) =>
        itemService.addOrderItems(
          req.body.order_id,
          item.product_id,
          item.quantity
        )
      )
    );

    if (result.affectedRows === 0) {
      res.json({ message: "Make order failed" });
    }

    return res.status(200).json({ message: "create order success" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
  addOrderItems,
};
