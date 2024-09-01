const userServices = require("./user.service");
const imageServices = require("../images/image.service");
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

const updateUserAvatar = async (req, res, next) => {
  try {
    const url = await userServices.updateUserAvatar(req.files[0]);

    const result = imageServices.createImages(url, req.user);

    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserByName,
  createNewUser,
  updateUserAvatar,
};
