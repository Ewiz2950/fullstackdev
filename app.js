var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const createError = require('http-errors');

// connecting app routes
var indexRouter = require('./routes/index');


var app = express();
const hbs = exphbs.create({
  extname      : '.hbs',
  layoutsDir   : path.join(__dirname, 'views', 'layouts'),
  defaultLayout: 'main',
  helpers      : path.join(__dirname, 'helpers'),
  partialsDir  : [
    path.join(__dirname, 'views', 'partials')
  ]
});

// view engine setup
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, "node_modules", 
        "bootstrap-icons", "font")));


app.use('/', indexRouter);

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
