//dependencies
//pass 7209
const mongoose = require("mongoose");
// passport-local-mongoose - autontication strateg modul
// const passportLocalMongoose = require("passport-local-mongoose");

// connect to database
mongoose.connect("mongodb+srv://atmelaku:7209@cluster0.lxvmzes.mongodb.net/?retryWrites=true&w=majority");
const Schema = mongoose.Schema;





const Order = new Schema({
  username: String,
  email: String,
  bookTitle: String,
  totalPrice: String,
  creditNumber: String,
  exprDate: String,
  cvvNumber: String,
  strAddress: String,
  city: String,
  state: String,
  zipCode: String
})
// Export Model

module.exports = mongoose.model("orderinfo", Order);
