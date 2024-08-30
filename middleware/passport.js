const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const promiseConnection = require("../routes/connection");
const crypto = require("crypto");

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
    const [rows, field] = await promiseConnection.query(
      "SELECT * FROM user WHERE user.user_name = ?",
      [user_name]
    );
    if (rows.length === 0) {
      return cb(null, false, {
        message: "Incorrect user_name or password.",
      });
    }
    const user = rows;
    const isValid = validPassword(
      password,
      user[0].user_password,
      user[0].salt
    );
    if (isValid) {
      return cb(null, user);
    } else {
      return cb(null, false, {
        message: "Password is wrong",
      });
    }
  } catch (err) {
    console.log(err);
    return cb(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log(`Debug serializer ${user}`);
  done(null, user[0].id); // Assuming you have an 'id' field in your 'user' table
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
