var mongoose = require("mongoose");
var passporLocalMongoose = require("passport-local-mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var userschema = new mongoose.Schema({
    username: String,
    password: String
});
userschema.plugin(passporLocalMongoose);
module.exports = mongoose.model("user",userschema);