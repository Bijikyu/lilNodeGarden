 // Require essential modules
const createError = require('http-errors'); 
const express = require('express');
const path = require('path'); //module for building view path
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session'); //sets cookie with session id
const passport = require('passport'); // authentication middleware
require('dotenv').config({ path: ".env" }); //load secrets from .env file 
require('./config/database'); //requires database
require('./config/passport'); // requires config file for passport
const methodOverride = require('method-override'); // listens to change POST to PUT/DELETE ?_method=DELETE or ?_method=PUT

// Require other modules
const indexRouter = require('./routes/index');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
const cors = require('cors');

const app = express(); // create the express app

// Configure the app (app.set)
app.set('view engine', 'ejs'); //assign the view engine
app.set('views', path.join(__dirname, 'views')); //tell view engine where the views are
 	
// Mount middleware (app.use)
app.use(cors());
app.use(logger('dev')); // info about req is logged in terminal
app.use(express.json()); // if JSON present adds properties to req.body
app.use(express.urlencoded({ extended: false })); //if form data present adds properties (<input> name attributes) to/as req.body
app.use(cookieParser()); // adds properties to req.body for cookies in HTTP request
app.use(session({ 
  secret: 'nodeGarden', //the secret is used to sign the session cookie //DEPLOY change for instance
  resave: false, //suppress deprecation warnings
  saveUninitialized: true //suppress deprecation warnings
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) { //logged in user is in a variable available to all EJS templates, if logged out, `user` will be `undefined`.
  res.locals.user = req.user;
  next();
});
app.use(express.static(__dirname + '/public')); //set public folder (for static assets)
app.use(methodOverride('_method')); // listens to change POST to PUT/DELETE via ?_method=DELETE or ?_method=PUT
 	
// Mount routes
// Best practice routing
app.use('/', indexRouter);
app.use('/items', itemsRouter); 
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('404');
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

// Tell the app to listen on port, start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
const mySecret = process.env['DATABASE_URL']
