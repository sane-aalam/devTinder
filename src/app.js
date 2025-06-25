const express = require("express");
const connectDB = require("../config/database.js");
const User = require("../models/user.js");
const app = express();
const port = 3000;

// Middleware to parse JSON data from the request body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//! Create POST /sigup API to add data to database
//! Error Handling using try , catch

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).json({
      user,
      msg: "User successfully added to the database",
    });
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// get by userId - findOne
app.get("/user", async (req, res) => {
  const emailId = req.body.emailId;
  try {
    const user = await User.findOne({ emailId });
    return res.json({
      user,
      msg: "Get data successfully into the database",
    });
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({
      users,
      msg: "Get all successfully all user into the database",
    });
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// delete by userId
app.delete("/user", async (req, res) => {
  const { emailId } = req.body;
  try {
    const deletedUser = await User.findOneAndDelete({ emailId });
    if (!deletedUser) {
      return res.status(404).json({
        msg: "User not found with the given emailId",
      });
    }
    return res.json({
      user: deletedUser,
      msg: "User deleted successfully from the database",
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// update by userID

app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; // Contains fields to update (name, email,gender)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true } // return updated doc, and run schema validation
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.json({
      user: updatedUser,
      msg: "User updated successfully",
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
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
