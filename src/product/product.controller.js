const productServices = require("./product.service");

const createProduct = async (req, res) => {
  try {
    var product = await productServices.createProduct(req.body);
    console.log(product);
    if (product.error) {
      return res.status(500).json({
        message: "Create product FAILED. USER or CATEGORY is not exist",
      });
    } else {
      return res.status(200).json({ message: "Create product SUCCESS" });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    var product = await productServices.updateProduct(req.body.id, req.body);
    console.log(product);
    if (product.error) {
      return res.status(500).json(product);
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    var product = await productServices.deleteProduct(req.body.id);
    console.log(product);
    if (product.error) {
      return res.status(500).json(product);
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(err);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
