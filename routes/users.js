const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
require('dotenv').config

const store = session.MemoryStore();
router.use(session({
  saveUninitialized: false,
  resave: true,
  secret: 'giahuyday',
  cookie: {
      maxAge: 1000 * 20 // 10s
  },
  store
}))

router.use(passport.initialize());
router.use(passport.session());
// router.use(passport.authenticate('session'));


passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user.id); // Assuming you have an 'id' field in your 'account' table
});

passport.deserializeUser((user, done) => {
  connection.query('SELECT * FROM account WHERE id = ?', [user.id], (err, users) => {
      if (err) return done(err);

      if (users.length > 0) {
          const user = users[0];
          console.log(`deserializeUser:::`, user);
          done(null, user);
      } else {
          done(null, false);
      }
  });
});



passport.use(new LocalStrategy((username, password, done) => {
  connection.query('SELECT * FROM account WHERE account.username = ?', [username], function(err, users) {
      if (err) {
          return done(err);
      }

      if (users.length > 0) {
          const user = users[0];
          // Kiểm tra mật khẩu ở đây (thích hợp sử dụng hash và salt)
          if (user.password === password) {
              // console.log('True password')
              return done(null, user);
          } else {
              return done(null, false, { message: 'Incorrect password.' });
          }
      } else {
          return done(null, false, { message: 'User not found.' });
      }
  });
}));


router.post('/api/login', passport.authenticate('local', {
  successRedirect: '/cart',
  failureRedirect: '/login'
}), (req, res) => {
  // PassportJS sẽ xử lý chuyển hướng, không cần phải thêm res.redirect('/')
  // ...
  try {
      console.log(req.body);
      // Truyền về phản hồi JSON với status code và dữ liệu
      res.status(200).json({
          message: 'Login successful',
          user: req.user,
      });
  } catch (error) {
      res.status(500).json({
          error: error.message,
      });
  }
});



/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', {title: "Login"})
});


// router.post('/api/login', (req, res) => {
//   // Thực hiện xác thực và các thao tác khác trên cơ sở dữ liệu ở đây
//   // Ví dụ: kiểm tra thông tin đăng nhập, trả về kết quả

//   const username = req.body.username
//   const password = req.body.password

//   console.log(username, password)
  
//   connection.query('SELECT * FROM account WHERE account.username = ? AND account.password = ?', [username, password], (err, result) => {
//     if (err) {
//       console.log(err)
//     }
//     if (result.length > 0) {
//       console.log(result)
//       // res.redirect("/")
//       res.json("Redirected to home")
//     } else {
//       console.log(result)
//       res.redirect("/login")
//     }
//   })
// });


router.get('/signup', function(req, res, next){
  res.render('signup', {title: "SignUp"})
})

module.exports = router;
