var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// Home

/*
router.get('/home', function(req, res){
  res.render('home');
});
*/

// Register
router.get('/register', function(req, res){
  res.render('register');
});

// Register user
router.post('/register', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  // Validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    var newUser = new User({
      username: username,
      password: password
    });

    User.createUser(newUser, function(err, user) {
      if(err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login!');
    res.redirect('/users/login');
  }
  //res.render('register');
});

// Login
router.get('/login', function(req, res){
  res.render('login');
});

// Result
router.get('/result', verifyAuthenticated, function(req, res){
  res.render('result');
});

function verifyAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else {
    req.flash('error_msg', 'You are not logged in!');
    res.redirect('/users/login');
  }
}

// Retrieved from http://www.passportjs.org/docs/username-password/ ------------------------------
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch) {
          return done(null, user);
        }
        else {
          return done(null, false, {message: 'Invalid username or password'});
        }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });

});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login'); //might need to change
});

module.exports = router;
