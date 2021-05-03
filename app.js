var express = require('express');
var path = require('path');
const exphbs = require('express-handlebars');
const createError = require('http-errors');
const flash = require('connect-flash');
var session = require('express-session');

// connecting app routes
var indexRouter = require('./routes/index');


var app = express();
const hbs = exphbs.create({
  extname : '.hbs'
});

// view engine setup
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(session({
	key: 'app_session',
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'dist', 'public')));
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
