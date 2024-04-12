const mongoose = require("mongoose");
let UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
});
module.exports = mongoose.model("Users", UserSchema);
