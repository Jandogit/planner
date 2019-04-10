var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  username: String,
  kills: Number,
  deaths: Number,
  matchesP: Number,
  matchesW: Number
});

var Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
