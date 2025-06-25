const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["Male", "Female", "Other"].includes(value)) {
          throw new Error("gender data is not valid!");
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 50,
    },
    skills: {
      type: [String], // e.g., ["JavaScript", "Node.js"]
      default: [],
    },
    photoUrl: {
      type: String, // store image URL or file path
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUZr8J_NnQJMD6bl8-AdMIwE0eP_3jOmCv6xL59PRTuwllTH4uiiU-9h0YdR31H2c09jc&usqp=CAU",
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
