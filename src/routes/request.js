const express = require("express");
const requestRouter = express.Router();
const { isUserAuthenticated } = require("../middlewares/auth.js");

requestRouter.post("/sendConnectionRequest",isUserAuthenticated, async (req, res) => {
    console.log("sendConnectionRequest succesfully!");
    const user = req.user;
    return res.json({
      user,
    });
  }
);

module.exports = requestRouter;
