//dependencies
//pass 7209
const mongoose = require("mongoose");
// passport-local-mongoose - autontication strateg modul
const passportLocalMongoose = require("passport-local-mongoose");

// connect to database
mongoose.connect("mongodb+srv://atmelaku:7209@cluster0.lxvmzes.mongodb.net/?retryWrites=true&w=majority");
const Schema = mongoose.Schema;

const User = new Schema({
  fname: String,
  lname: String,
  email: String,
  username: String,
  zipcode: String
})

// plugin is for user authentication
User.plugin(passportLocalMongoose);


const Order = new Schema({
  username: String,
  enail: String,
  bookTitle: String,
  totalprice: String,
  creditCard: String,
  address: String
})
// Export Model

module.exports = mongoose.model("userinfos", User);
