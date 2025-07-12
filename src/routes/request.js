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
      // const {toUserId,status} = req.params;

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

      // create the document,then save into db
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

// to understand the status send by user, keep name of variable clean
// status = given by user (accepted, rejected)
requestRouter.post("/request/review/:status/:requestId", isUserAuthenticated, async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      // allowed status interested,then only able to accepted the request
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(400).json({
          success: false,
          message: "Connection request not exists",
        });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

module.exports = requestRouter;

