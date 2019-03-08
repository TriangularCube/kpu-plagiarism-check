// ------------------------------ START ------------------------------


// Require these dependencies ------------------------------


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var LocalStrategy = require('Strategy');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/KPU-PDW', { useNewUrlParser: true });
var db = mongoose.connection;﻿


// Require routes ------------------------------


var routes = require('./routes/index');
var users = require('./routes/users');


// Initialize Express application ------------------------------


var app = express();


// View engine ------------------------------


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


// BodyParser middleware ------------------------------


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Set static folder ------------------------------


app.use(express.static(path.join(__dirname, 'public')));


// Express session ------------------------------


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport Initialize ------------------------------


app.use(passport.initialize());
app.use(passport.session());


// Express vadliator ------------------------------


app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg : msg,
        value : value
      };
    }
}));


// Connect flash ------------------------------


app.use(flash());


// Set global variables for flash messages ------------------------------


app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);


// Set port ------------------------------


app.set('port', (process.env.PORT || 9000));

app.listen(app.get('port'), function(){
    console.log('Server initialized on port ' + app.get('port'));
    console.log('To terminate session, use Ctrl + C')
});


// ------------------------------ END ------------------------------
