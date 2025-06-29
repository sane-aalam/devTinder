const express = require("express");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const { ValidatorSignData } = require("./Utils/Validation.js");
const {isUserAuthenticated} = require("./middlewares/auth.js");

const app = express();
const port = 3000;

//* Middleware to parse JSON data from the request body
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validate data in Signup API
    ValidatorSignData(req);
    const { firstname, lastname, emailId, age, gender, password } = req.body;
    // Create PasswordHash using bcrypt.hash
    // save the user is excrupted password
    const PasswordHash = await bcrypt.hash(password, 10); // 10 is salt rounds

    const user = new User({
      firstname,
      lastname,
      emailId,
      gender,
      age,
      password: PasswordHash,
    });

    await user.save();
    return res.status(201).json({
      user,
      msg: "User successfully added to the DB!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create login API
//  - Compare passwords and throw errors if email or password is invalid
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid -", isPasswordValid);

    if (isPasswordValid) {
      // sending token, when user login[with emailId,password]
      var token = jwt.sign({ _id: user._id }, "devTinder$7302");

      res.cookie("token", token);
      res.send("Login Successfully!");
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// create GET /profile APi and check if you get the cookie back
// isUserAuthenticated = before gonna to profile level-checked!
app.get("/profile", isUserAuthenticated, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/sendConnectionRequest", isUserAuthenticated, async (req,res) =>{
   console.log("sendConnectionRequest succesfully!")
   const user = req.user;
   return res.json({
     user
   })
})

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
