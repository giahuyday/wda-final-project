const cartServices = require("./cart.service");

const addToCart = async (req, res) => {
  try {
    const result = await cartServices.addToCart(req.user, req.body.product_id);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const result = await cartServices.removeFromCart(req.body.cart_id);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateCartQuantiy = async (req, res) => {
  try {
    const result = await cartServices.updateCartQuantiy(
      req.body.cart_id,
      req.body.quantity
    );

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCartQuantiy,
};
