const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const userServices = require("../src/user/user.service");

const customFields = {
  usernameField: "user_name",
  passwordField: "user_password",
};

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 32, "sha256")
    .toString("hex");
  // console.log(hash, hashVerify);
  return hash === hashVerify;
}

const verifyCallback = async (user_name, password, cb) => {
  try {
    console.log(user_name);
    const result = await userServices.getUserByName(user_name);
    const user = JSON.parse(result);

    if (user === null) {
      return cb(null, false, {
        message: "Incorrect User.",
      });
    }
    const isValid = validPassword(password, user.user_password, user.salt);
    if (isValid) {
      return cb(null, user);
    } else {
      return cb(null, false, {
        message: "Password is wrong",
      });
    }
  } catch (err) {
    return cb(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id); // Assuming you have an 'id' field in your 'user' table
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
