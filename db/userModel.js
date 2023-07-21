const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide Firstname!"],
    unique: [true, "Firstname Exist"],
  },

  lastname: {
    type: String,
    required: [true, "Please provide Lastname!"],
    unique: [true, "Lastname Exist"],
  },

  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },

  address: {
    type: String,
  },
});

module.exports = mongoose.model.Users || mongoose.model("User", UserSchema);
