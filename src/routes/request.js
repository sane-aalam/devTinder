const express = require("express");
const requestRouter = express.Router();
const { isUserAuthenticated } = require("../middlewares/auth.js");
const User = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequest.js");

requestRouter.post("/request/send/:status/:toUserId", isUserAuthenticated, async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // allowed status user can send request
      // only have ignored/interested status
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      // check if a userId is already exits into db
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      // Check if a connection request already exists
      // return error - "Connection request already exists",
      const existingConnectRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectRequest) {
        return res.status(400).json({
          success: false,
          message: "Connection request already exists",
        });
      }

      // save into db
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      return res.status(201).json({
        success: true,
        massage: "connect request successfully sended!",
        data: data,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = requestRouter;
