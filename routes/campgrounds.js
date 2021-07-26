var express             = require("express");
var router              = express.Router();
var Campground          = require("../models/campgrounds");
var Comment             = require("../models/comment");
var middleware          = require("../middleware");

router.get("/",function(req,res){
	// console.log(req.user);
	// get all campgrounds from db	
	Campground.find({},function(err,allcampgrounds){
	if(err){
		console.log(err);
	}else{
		res.render("campgrounds/index",{campgrounds: allcampgrounds});
	}
	// res.render("campground",{campgrounds: campgrounds});
	});
});
// CREATE - Create new campground
router.post("/",middleware.isLoggedIn,function(req,res){
	//get data from form 
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newcampground = {name: name , image: image, description: description, author: author, price:price};
	// create a new campground and save to database
	Campground.create(newcampground,function(err,newlycreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});
//NEW - Show form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new")
});
//SHOW
router.get("/:id",function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
})
// EDIT CAMPGROUND
router.get("/:id/edit",middleware.checkcampgroundownership,function(req,res){
		Campground.findById(req.params.id, function(err,foundCampground){
			res.render("campgrounds/edit",{campground: foundCampground});
		});
});		
// UPDATE CAMPGROUND 
router.put("/:id",middleware.checkcampgroundownership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+ req.params.id);
		}
	});
});
router.delete("/:id",middleware.checkcampgroundownership,function(req,res){
	Campground.findByIdAndDelete(req.params.id,function(err,deleted){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});
module.exports = router;