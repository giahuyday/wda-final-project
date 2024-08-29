const promiseConnection = require("../../routes/connection");

const createCategory = async (category) => {
  try {
    const result = await promiseConnection.query(
      "INSERT INTO category (cate_name, cate_description) VALUES(?, ?)",
      [category.cate_name, date.cate_description]
    );

    return {
      id: result.id,
      cate_name: result.cate_name,
      cate_description: result.cate_description,
    };
  } catch (err) {
    console.log(err);
  }
};

const deleteCategory = async (category) => {
  try {
    const result = await promiseConnection.query(
      "UPDATE category SET is_deleted = 1 WHERE id = ?",
      [category.id]
    );

    return {
      message: "category deleted",
    };
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

const updateCategory = async (id, category) => {
  try {
    const result = await promiseConnection.query(
      "UPDATE category SET cate_name = ?, cate_description = ? WHERE id = ?",
      [category.cate_name, category.cate_description, id]
    );

    return {
      message: "category updated",
    };
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
};
