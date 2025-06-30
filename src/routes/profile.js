const express = require("express");
const profileRouter = express.Router();
const { isUserAuthenticated } = require("../middlewares/auth.js");
const { validateEditProfileData } = require("../Utils/Validation.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

profileRouter.get("/profile/view", isUserAuthenticated, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

profileRouter.patch("/profile/edit", isUserAuthenticated, async (req, res) => {
  try {
    validateEditProfileData(req);
    const loggedInUser = req.user;

    // loggedInUser.firstName = req.firstName [repeat for all]
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    // save into db
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstname}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//* PATCH Route: Update Logged-in User's Password
/**
 * PATCH /update-password
 * Body: { email, password, newPassword }
 * Description: Updates the user's password after validating email & current password.
 */

profileRouter.patch(
  "/profile/password",
  isUserAuthenticated,
  async (req, res) => {
    try {
      const { emailId, password, newPassword } = req.body;

      if (!emailId || !password || !newPassword) {
        return res
          .status(400)
          .json({
            error: "emailId, current password, and new password are required.",
          });
      }

      // Find user by emailId
      const user = await User.findOne({ emailId }).select("+password");

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Compare current password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ error: "Current password is incorrect." });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password,save into db
      user.password = hashedPassword;
      await user.save();

      res.json({ message: "Password updated successfully!", data: user });
    } catch (error) {
      console.error("Password update error:", error);
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again." });
    }
  }
);

module.exports = profileRouter;
