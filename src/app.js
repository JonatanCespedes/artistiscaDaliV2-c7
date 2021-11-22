var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let methodOverride = require('method-override');

var express = require('express');
const localsCheck = require('./middlewares/localsCheck')
let categoriesHeader = require('./middlewares/categoriesHeader')
var cookieSession = require('cookie-session')

/* Enrutadores */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/apiRoutes.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* Middlewares */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(localsCheck)
app.use(categoriesHeader)
app.use(cookieSession({
  name: 'session',
  keys: ["user"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

/* Rutas */
app.use('/', indexRouter); // Home - contact
app.use('/users', usersRouter); // Login - register - Profile
app.use('/products', productsRouter); // Categories - ProductDetail - CRUD
app.use('/admin', adminRouter); // Admin
app.use('/api', apiRouter); // APIs

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
