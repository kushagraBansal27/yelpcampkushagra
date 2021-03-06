var express = require("express");
var router = express.Router({mergeParams: true});
var Campground          = require("../models/campgrounds");
var Comment             = require("../models/comment");
var middleware          = require("../middleware");
//COMMENT ROUTE
router.get("/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	})
})
//============================
router.post("/",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment,function(err, comment){
				if(err){
					req.flash("error","Something went wrong");
					console.log(err);
				}else{
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Added comment successfully");
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
});
router.get("/:comment_id/edit",middleware.checkcommentownership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back")
		}else{
			res.render("comments/edit",{campground_id: req.params.id,comment: foundComment});
		}
	})
});
router.put("/:comment_id",middleware.checkcommentownership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+ req.params.id);
		}
	})	
})
router.delete("/:comment_id",middleware.checkcommentownership,function(req,res){
	Comment.findByIdAndDelete(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Deleted comment successfully");
			res.redirect("/campgrounds/"+ req.params.id);
		}
	})	
})

module.exports = router;