const crypto = require("crypto");

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resource because you are not an admin.",
    });
  }
};

module.exports.isPassword = (password, salt, hashPass) => {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 32, "sha256")
    .toString("hex");
  // console.log(hash, hashVerify);
  return hashPass === hashVerify;
};
