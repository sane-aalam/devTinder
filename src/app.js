const express = require("express");
const connectDB = require("../config/database.js");
const User = require("../models/user.js");
const app = express();
const port = 3000;

// SignUp
// Post Request gonna to backend
// Send Req.body data which given by postman into the
// Low level thinking
// When user SignUp page Then store into the database

// write api for storing the data into backend
// when user login page

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// creating the new instance of new user model
// creating the new instance of user model into mongoose (database)
// firstname,lastname,emaiID,password,age,gender

app.post("/signup", (req, res) => {
  const user = new User({
    firstName: "Akshay 2",
    lastName: "saini",
    emailId: "akshaysaini@gmail.com",
    password: "akshaysaini@123",
    age: 25,
    gender: "male",
  });

  user.save();
  res.send("user added clearly");
});

// first connect with database
// then only you can do app.listen(listen our app port 5000 NO.)
connectDB()
  .then(() => {
    console.log("database connection is established");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("database can not established");
  });
