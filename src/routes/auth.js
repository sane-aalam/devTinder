const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const { ValidatorSignData } = require("../Utils/Validation.js");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validate data in Signup API
    ValidatorSignData(req);
    const { firstname, lastname, emailId, age, gender, password } = req.body;
    // Create PasswordHash using bcrypt.hash
    // save the user is excrupted password
    const PasswordHash = await bcrypt.hash(password, 10); // 10 is salt rounds

    const savedUser = new User({
      firstname,
      lastname,
      emailId,
      gender,
      age,
      password: PasswordHash,
    });

    await savedUser.save();
    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   POST /login
 * @desc    Authenticates user credentials and returns a JWT token on success
 * @access  Public
 *
 * Functionality:
 * - Accepts user's email and password in the request body.
 * - Validates the input fields (e.g., format, presence).
 * - Checks if the user exists in the database.
 * - Compares hashed password using bcrypt.
 * - On successful authentication:
 *    - Generates and returns a JWT token.
 *    - Optionally sets a cookie/session for user session management.
 * - On failure:
 *    - Returns appropriate error messages (e.g., invalid email/password).
 *
 * Notes:
 * - Ensure bcrypt.compare is used for secure password checking.
 * - Use environment variables for JWT secrets and expiration configs.
 * - Keep rate-limiting and brute-force protection in mind (future enhancement).
 */

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials!");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post("/logout", (req, res) => {
  const { token } = req.cookies;

  // expires token current time
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout Successfully!");
});

module.exports = authRouter;
