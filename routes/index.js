// ------------------------------ index.js ------------------------------


// Declare variables ------------------------------


var express = require('express');
var router = express.Router();


// Get home page ------------------------------


router.get('/', verifyAuthenticated, function(req, res){
  res.render('index');
});


// Verified if user is authenticated ------------------------------


function verifyAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else {
    req.flash('error_msg', 'You are not logged in!');
    res.redirect('/users/login');
  }
}

module.exports = router;


// ------------------------------ END ------------------------------
