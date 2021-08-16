var express = require('express');
var path = require('path');
const createError = require('http-errors');
const flash = require('connect-flash');
var session = require('express-session');
var db = require('./config/db.js');


// register helpers
const helpers = require('./dist/helpers/helpers');

// connecting app routes
var indexRouter = require('./routes/index');
var checkoutRouter = require('./routes/checkout');
var receiptRouter = require('./routes/receipt');
var reviewRouter = require('./routes/review');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var staffRouter = require('./routes/staff');
var ordersRouter = require('./routes/orders')

var app = express();

app.use(session({
	key: 'app_session',
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'dist', 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, "node_modules", 
                                              "bootstrap-icons", "font")));
                                              
app.use('/', indexRouter);
app.use('/staff', staffRouter);
app.use('/checkout', checkoutRouter);
app.use('/receipt', receiptRouter);
app.use('/review', reviewRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
