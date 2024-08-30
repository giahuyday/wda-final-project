const promiseConnection = require("../../routes/connection");

const createProduct = async (product) => {
  try {
    await promiseConnection
      .query(
        "INSERT INTO product (product_name, product_description, stock, user_id, cate_id) VALUES(?, ?, ?, ?, ?)",
        [
          product.product_name,
          product.product_description,
          product.stock,
          product.user_id,
          product.cate_id,
        ]
      )
      .then((result) => {
        console.log(result.rows);
      });
    return {
      message: "Create new product success !!",
    };
  } catch (err) {
    // Check if the error is due to a foreign key constraint violation
    if (
      err.code === "ER_NO_REFERENCED_ROW_2" ||
      err.code === "ER_NO_REFERENCED_ROW"
    ) {
      console.error("Foreign key constraint error:", err);

      return {
        message: "Failed to create product. Foreign key constraint error.",
        error: `Invalid reference in field '${
          err.sqlMessage.match(/FOREIGN KEY \(`(.*?)`\)/)[1]
        }'. Please ensure the referenced data exists.`,
      };
    } else {
      // Handle other errors
      console.error("Error creating product:", err);

      return {
        error: err.message,
      };
    }
  }
};

const getProduct = async (productId) => {
  await promiseConnection
    .query(
      "SELECT * FROM product WHERE product.id = ?",
      [productId],
      (err, result) => {
        if (err) {
          res.render(err);
          res.send("Failed !");
        } else {
          console.log(result);
          res.render("product", { data: result });
        }
      }
    )
    .catch((err) => {
      return { error: err };
    });
};

const getProducts = async () => {
  const [rows, fields] = await promiseConnection.query(
    "SELECT * FROM product ORDER BY created_at DESC"
  );

  return rows;
};

const updateProduct = async (productId, updatedProduct) => {
  try {
    const [result] = await promiseConnection.query(
      `UPDATE product 
       SET product_name = ?, 
           product_description = ?, 
           stock = ?, 
           user_id = ?, 
           cate_id = ? 
       WHERE id = ?`, // Assuming 'id' is the primary key for the product
      [
        updatedProduct.product_name,
        updatedProduct.product_description,
        updatedProduct.stock,
        updatedProduct.user_id,
        updatedProduct.cate_id,
        productId, // The ID of the product to update
      ]
    );

    if (result.affectedRows === 0) {
      return {
        message: "No product found with the provided ID. Update failed.",
      };
    }

    return {
      message: "Product updated successfully!",
    };
  } catch (err) {
    // Check for foreign key constraint violation
    console.log(err);
    return { error: err.message };
  }
};

const deleteProduct = async (product) => {
  try {
    await promiseConnection.query(
      "UPDATE product SET is_deleted = 1 WHERE product.id = ?",
      [product]
    );

    if (result.affectedRows === 0) {
      return {
        message: "No product found with the provided ID. Update failed.",
      };
    }

    return {
      message: "Product deleted successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

const getProductByCategory = async (cate_id) => {
  const [rows, fields] = await promiseConnection.query(
    "SELECT * FROM product WHERE product.cate_id = ?",
    [cate_id]
  );

  return rows;
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  getProductByCategory,
  updateProduct,
  deleteProduct,
};
