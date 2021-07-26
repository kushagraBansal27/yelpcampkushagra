var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var data = [
	{
		name:"clouds rest",
		image:"https://www.photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c7c2d7ad69545c75e_1280.jpg&user=Pexels",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie at elementum eu facilisis sed odio morbi quis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Congue quisque egestas diam in. Vehicula ipsum a arcu cursus vitae. Arcu non sodales neque sodales ut etiam sit amet. Orci sagittis eu volutpat odio facilisis mauris sit amet. Bibendum ut tristique et egestas quis ipsum. Pulvinar elementum integer enim neque volutpat. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Libero justo laoreet sit amet. Elementum nibh tellus molestie nunc. Praesent tristique magna sit amet. In pellentesque massa placerat duis ultricies lacus. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Libero volutpat sed cras ornare. Amet volutpat consequat mauris nunc congue nisi vitae."
	},
	{
		name:"Desert",
		image:"https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7c2d79d5964fc55d_1280.jpg&user=Pexels",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie at elementum eu facilisis sed odio morbi quis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Congue quisque egestas diam in. Vehicula ipsum a arcu cursus vitae. Arcu non sodales neque sodales ut etiam sit amet. Orci sagittis eu volutpat odio facilisis mauris sit amet. Bibendum ut tristique et egestas quis ipsum. Pulvinar elementum integer enim neque volutpat. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Libero justo laoreet sit amet. Elementum nibh tellus molestie nunc. Praesent tristique magna sit amet. In pellentesque massa placerat duis ultricies lacus. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Libero volutpat sed cras ornare. Amet volutpat consequat mauris nunc congue nisi vitae."
	},

	{
		name:"Canyon floor",
		image:"https://www.photosforclass.com/download/pixabay-1189929?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7c2d7ad69545c75e_1280.jpg&user=Noel_Bauza",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie at elementum eu facilisis sed odio morbi quis. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Congue quisque egestas diam in. Vehicula ipsum a arcu cursus vitae. Arcu non sodales neque sodales ut etiam sit amet. Orci sagittis eu volutpat odio facilisis mauris sit amet. Bibendum ut tristique et egestas quis ipsum. Pulvinar elementum integer enim neque volutpat. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Libero justo laoreet sit amet. Elementum nibh tellus molestie nunc. Praesent tristique magna sit amet. In pellentesque massa placerat duis ultricies lacus. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Libero volutpat sed cras ornare. Amet volutpat consequat mauris nunc congue nisi vitae."
	}
]
function seedDB(){
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("removed")
				// add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}else{
					console.log("campground added");
					Comment.create({
						text:"This place is great but i wish there was internet",
						author:"HOMIE"
					},function(err,comment){
						if(err){
							console.log(err);
						}else{
							campground.comments.push(comment);
							campground.save();
							console.log("comment added")
						}
					});
				}
			});
		});	
		}
	});

}	
	// add a few comments

module.exports=seedDB;
