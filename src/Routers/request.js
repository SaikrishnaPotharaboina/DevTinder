const mongoose = require("mongoose");
const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const ConnectonRequest = require("../models/connectionRequest");
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



        const exitingConnectionRequest = await ConnectonRequest.findOne({
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

        const user = await User.findById(toUserId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }



        const connectonRequest = new ConnectonRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectonRequest.save();
        return res.status(200).json({
            message: "connecton sent successfull",
            data
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = requestRouter;
