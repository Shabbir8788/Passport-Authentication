const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    require: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
