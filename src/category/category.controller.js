const categoryService = require("./category.service");

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);

    if (!category) {
      return res.status(404).json({ message: "Create category FAILED !!" });
    }

    return category;
  } catch (err) {
    throw new Error(`Error creating category ${err}`);
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
  updateCategory,
  deleteCategory,
};
