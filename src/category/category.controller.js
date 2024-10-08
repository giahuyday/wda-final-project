const categoryService = require("./category.service");

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);

    return res.json(category);
  } catch (err) {
    console.log(err);
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await categoryService.getCategory(req.body.category_id);
    if (categories.error) {
      return res.status(500).json(categories);
    }

    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();

    return res.status(200).send(categories);
  } catch (err) {
    console.log(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.body.id,
      req.body
    );

    if (category.err) {
      return res.status(404).json(category);
    }

    return res.status(200).json(category);
  } catch (err) {
    console.log(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.body);

    if (category.err) {
      return res.status(404).json(category);
    }

    return res.status(200).json(category);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
