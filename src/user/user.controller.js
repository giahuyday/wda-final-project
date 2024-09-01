const userServices = require("./user.service");

const getUserByName = async (req, res, next) => {
  try {
    const result = await userServices.getUserByName(req.body.user_name);

    return res.json(result);
  } catch (err) {
    return { error: err };
  }
};

const createNewUser = async (req, res, next) => {
  try {
    const result = await userServices.createNewUser(req);

    return res.redirect("/");
  } catch (err) {
    return { error: err };
  }
};

module.exports = {
  getUserByName,
  createNewUser,
};
