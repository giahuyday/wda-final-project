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

module.exports = {
  changePassword,
};
