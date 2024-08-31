const router = require("../../routes/user/users");
const userServices = require("./user.service");

const changePassword = async (req, res, next) => {
  try {
    const result = await userServices.changePassword(
      req.user,
      req.body.user_password
    );
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

const getUserByName = async (req, res, next) => {
  try {
    const result = await userServices.getUserByName(req.body.user_name);

    return res.json(result);
  } catch (err) {
    return { error: err };
  }
};

module.exports = {
  changePassword,
  getUserByName,
};
