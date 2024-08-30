const router = require("../../routes/user/users");
const userServices = require("./user.service");

const changePassword = async (req, res, next) => {
  try {
    console.log(req.user);
    console.log(req.body.user_password);
    const result = await userServices.changePassword(
      req.user,
      req.body.user_password
    );
    console.log(result);
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

module.exports = {
  changePassword,
};
