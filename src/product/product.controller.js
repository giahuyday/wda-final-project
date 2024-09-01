const productServices = require("./product.service");
const awsService = require("../images/aws.s3.service");
const imageService = require("../images/image.service");

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

const createProductImages = async (req, res) => {
  try {
    const urls = await awsService.s3Uploadv2(req.files);
    const url = urls.map((url) => url.key.split("/")[1]);
    console.log(url);
    const result = Promise.all(
      url.map((url) =>
        imageService.createProductImages(url, Number(req.body.product_id))
      )
    );
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  try {
    var product = await productServices.getProduct(req.params);

    if (product.err) {
      return res.status(500).json(product);
    }
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productServices.getProducts();

    res.render("index", {
      data: products,
      title: "Home Page",
    });
  } catch (err) {
    console.log(err);
  }
};

const getProductByCategory = async (req, res) => {
  try {
    var products = await productServices.getProductByCategory(
      req.body.category_id
    );
    if (products) {
      return res.status(200).json(products);
    } else {
      return res
        .status(404)
        .json({ message: "not found any product with category" });
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
  createProductImages,
  getProduct,
  getProducts,
  getProductByCategory,
  updateProduct,
  deleteProduct,
};
