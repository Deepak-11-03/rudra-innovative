const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: Number,
  password: String,
  isDeleted:{type:Boolean,default:false},
  deletedAt:Date
});

module.exports = mongoose.model("User", userSchema);
