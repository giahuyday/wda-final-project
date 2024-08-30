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

const getCategory = async (category_id) => {
  const [rows, fields] = await promiseConnection.query(
    "SELECT * FROM category WHERE category.id = ?",
    [category_id]
  );
  console.log(rows);
  return rows;
};

const getCategories = async () => {
  const [rows, fields] = await promiseConnection.query(
    "SELECT * FROM category ORDER BY created_at DESC"
  );

  return rows;
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
  getCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
