const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: {type: Number, default: 0}  //use obj structure to pass more than one attribute
});

mongoose.model("users", userSchema);
