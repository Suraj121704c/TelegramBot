const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  city: String,
  country: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
