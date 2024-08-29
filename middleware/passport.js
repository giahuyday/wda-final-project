const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("../routes/connection");
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

const verifyCallback = (user_name, password, cb) => {
  // console.log(user_name);
  connection.query(
    "SELECT * FROM user WHERE user.user_name = ?",
    [user_name],
    (err, results) => {
      if (err) {
        console.log(err);
        return cb(err);
      }

      if (results.length === 0) {
        return cb(null, false, { message: "Incorrect user_name or password." });
      }

      const user = results[0];
      // console.log(user.user_name, user.password);
      const isValid = validPassword(password, user.user_password, user.salt);

      if (isValid) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    }
  );
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id); // Assuming you have an 'id' field in your 'user' table
});

passport.deserializeUser((id, done) => {
  const query = "SELECT * FROM user WHERE user.id = ?";

  connection.query(query, [id], (err, rows) => {
    if (err) {
      return done(err);
    }

    if (!rows.length) {
      return done(null, false);
    }

    const user = rows[0];
    console.log(user);
    done(null, user);
  });
});
