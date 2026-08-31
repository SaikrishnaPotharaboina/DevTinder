const mongoose = require("mongoose");
const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../Middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


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
});

userRouter.get("/feed", userAuth, async (req, res) => {

    const loggedinUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;


    const connectionRequest = await ConnectionRequest.find({

        $or: [{
            fromUserId: loggedinUser._id
        }, {
            toUserId: loggedinUser._id
        }]
    }).select("fromUserId toUserId");
    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
    });

    const user = await User.find({
        $and: [{ _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedinUser._id } }],
    })
        .select(["firstName", "lastName"])
        .skip(skip)
        .limit(limit);

    res.send(user);

});




module.exports = userRouter;
