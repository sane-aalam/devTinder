const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema Degisn
// FirstName,lastName,emailId,password,age,gender
const UserSchema = new Schema({
  firstName: {
    type: String,
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

// Purpose: It creates a Model from a Schema.
// Usage: The Model lets you interact with a MongoDB collection (like run queries, create, update, delete documents).
const User = mongoose.model("User", UserSchema);
module.exports = User;
