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
})


module.exports = userRouter;
