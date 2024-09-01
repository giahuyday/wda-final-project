const promiseConnection = require("../../routes/connection");

const createImages = async (url, user_id) => {
  const [rows, fields] = await promiseConnection.query(
    "INSERT INTO avatar (url, user_id) VALUES (?, ?)",
    [url, user_id]
  );

  return rows;
};

module.exports = {
  createImages,
};
