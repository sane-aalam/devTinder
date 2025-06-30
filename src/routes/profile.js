const express = require("express");
const profileRouter = express.Router();
const { isUserAuthenticated } = require("../middlewares/auth.js");

profileRouter.get("/profile", isUserAuthenticated, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = profileRouter;
