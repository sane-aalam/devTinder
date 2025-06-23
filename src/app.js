const express = require("express");
const connectDB = require("../config/database.js");
const User = require("../models/user.js");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", (req, res) => {
  const user = new User({
    firstName: "rohit",
    lastName: "sharma",
    emailId: "rohitsharma@gmail.com",
    password: "rohitsharma@123",
    age: 40,
    gender: "male",
  });

  user.save();
  res.send("user added clearly");
});


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