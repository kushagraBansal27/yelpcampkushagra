var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");
// Landing Page
router.get("/",function(req,res){
	res.render("landing");
});
// ===================
//     Auth Routes
// ===================
//  SHOW REGISTRATION FORM
router.get("/register",function(req,res){
	res.render("register");
})
router.post("/register",function(req,res){
	var newuser = new user({username: req.body.username});
	user.register(newuser,req.body.password,function(err,user){
		if(err){req.flash("error",err.message);
			return res.redirect("register");
		}	
		passport.authenticate("local")(req,res, function(){
			req.flash("success","Welcome to Yelpcamp "+ user.username);
			res.redirect("/campgrounds");
		});
	});
});
//  SHOW LOGIN	
router.get("/login",function(req,res){
	res.render("login");
});
// login logic
router.post("/login",passport.authenticate("local",
{
	successRedirect:"/campgrounds",
 	failureRedirect: "/login"
}),function(req,res){
});
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged you out");
	res.redirect("/campgrounds");
});

module.exports = router;