const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required:true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
