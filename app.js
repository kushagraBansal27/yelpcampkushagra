var express             = require("express");
var app                 = express();
var bodyparser          = require("body-parser");
var mongoose            = require("mongoose");
var passport            = require("passport");
var LocalStrategy       = require("passport-local");
var methodoverride		= require("method-override");
var user                = require("./models/user");
var Campground          = require("./models/campgrounds");
var Comment             = require("./models/comment");
var seedDB              = require("./seeds");
var flash 				= require("connect-flash");
const e                 = require("express");
const { serializeUser } = require("passport");
var commentroutes       = require("./routes/comments");
var campgroundroutes    = require("./routes/campgrounds");
var authroutes          = require("./routes/auth");

mongoose.connect("mongodb://localhost/yelp_camp_v12");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodoverride("_method"));
app.use(flash());
// seedDB(); seed the database

//PASSPORT CONFIG	
app.use(require("express-session")({
	secret: "Yelp Camp is the coolest app ever built",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});
app.use(function(req,res,next){
res.locals.error = req.flash("error");
res.locals.success = req.flash("success");
next();
});
app.use("/",authroutes);
app.use("/campgrounds",campgroundroutes);
app.use("/campgrounds/:id/comments",commentroutes);

app.listen(port,()=>
	console.log("started")
);