const express = require("express");
const requestRouter = express.Router();
const { isUserAuthenticated } = require("../middlewares/auth.js");
const User = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId",isUserAuthenticated,async (req, res) => {
    try {
      // let's write
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // user validation 'not able to send other type request"
      const allowedStatus = ["ignored", "interested"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json(
          { message: "Invalid status type: " + status }
        )
      }

      // find user into DB
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      return res.json({
        fromUserId,
        toUserId,
        status,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = requestRouter;
