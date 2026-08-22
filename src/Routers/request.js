const mongoose = require("mongoose");
const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")



requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;




        if (!mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        };



        if (fromUserId.toString() === toUserId.toString()) {
            return res.status(400).json({
                message: "You cannot send a connection request to yourself"
            });
        }


        const allowedStatus = ["ignored", "interested"];

        if (!allowedStatus.includes(status)) {
            throw new Error("Status Invalid")
        };



        const toUser = await User.findById(toUserId);

        if (!toUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const exitingConnectionRequest = await ConnectionRequest.findOne({
            $or: [

                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });

        if (exitingConnectionRequest) {
            return res.status(400).json({
                message: "Connection request already exists"
            })
        };




        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        let message;

        if (status === "interested") {
            message = `Connection request sent to ${toUser.firstName}.`;
        } else if (status === "ignored") {
            message = `You are not interested in connecting with ${toUser.firstName}.`;
        }
        return res.status(200).json({
            message,
            data
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
});



requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedinUser = req.user;
        const { status, requestId } = req.params;


        const allowedStatus = ["accepted", "rejected"];

        if (!allowedStatus.includes(status)) {
            return res.status(404).send("Status Invalid");
        };

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedinUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName");
        if (!connectionRequest) {
            return res.status(404).json({
                message: "Connection not found"
            });
        };

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        let message;

        if (status === "accepted") {
            message = `You are now connected with ${connectionRequest.fromUserId.firstName}.`;
        } else if (status === "rejected") {
            message = `You rejected ${connectionRequest.fromUserId.firstName}'s connection request.`;
        }
        res.json({
            message,
            data
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = requestRouter;
