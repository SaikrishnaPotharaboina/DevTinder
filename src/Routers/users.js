const mongoose = require("mongoose");
const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../Middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")


userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {
        const loggedinUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedinUser._id,
            status: "interested",
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl"]);

        res.status(200).json({
            message: "Data fetched Successfull",
            data: connectionRequest
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {

    try {

        const loggedinUser = req.user;

        const connectionRequests = await ConnectionRequest.find({

            $or: [
                {
                    toUserId: loggedinUser._id,
                    status: "accepted"
                },
                {
                    fromUserId: loggedinUser._id,
                    status: "accepted",
                },
            ],
        })
            .populate("fromUserId", ["firstName", "lastName"])
            .populate("toUserId", ["firstName", "lastName"]);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedinUser._id.toString()) {

                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.status(200).json({
            message: "Data fetched Successfull",
            data
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})




module.exports = userRouter;
