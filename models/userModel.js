const mongoose = require("mongoose");

// creating schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 300,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 3000,
    },
  },
  {
    timestamps: true,
  }
);

// creating model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
