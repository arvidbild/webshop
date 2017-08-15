var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/signup", function(req,res,next){
	res.render("signup");
}); 


router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  	console.log("the authentication was Successful");
    
    // Successful authentication, redirect to profile.
    res.redirect('/users/profile');
  });

router.get("/profile", function(req,res,next){
	res.render("profile");
});

module.exports = router;