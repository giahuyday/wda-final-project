const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var passport = require('passport')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session)



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const sessionStore = new MySQLStore({
  checkExpirationInterval: 15 * 60 * 1000, // 15 minutes
  expiration: 24 * 60 * 60 * 1000, // 1 day
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'id',
      expires: 'expires',
      data: 'data',
    },
  },
}, connection);

app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'giahuyday',
  cookie: {
    maxAge: 1000 * 20 * 60// 10s
  },
  store: sessionStore
}))


// Need to require the entire Passport config module so app.js knows about it
require('./middleware/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    next();
});

app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;