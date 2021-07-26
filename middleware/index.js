var Campground          = require("../models/campgrounds");
var Comment             = require("../models/comment");
var middlewareobj;
middlewareobj = {};
middlewareobj.checkcommentownership = function(req,res,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err,foundComment){
                if(err){
                    res.redirect("back")
                }else{
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error","You Dont have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        }else{
            req.flash("error","YOU NEED TO BE LOGGGED IN TO DO THAT");
            res.redirect("back");
        }
    }
middlewareobj.checkcampgroundownership = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err,foundCampground){
			if(err){
                req.flash("error","campground not found");
				res.redirect("back")
			}else{
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
                    req.flash("error","You Dont have permission to do that");
					res.redirect("back");
				}
			}
		});
	}else{
        req.flash("error","You need to log in to do that")
		res.redirect("back");
	}
}
middlewareobj.isLoggedIn = function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash("error","YOU NEED TO BE LOGGGED IN TO DO THAT");
            res.redirect("/login");
        }
    }
module.exports = middlewareobj;