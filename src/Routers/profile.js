const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const { validateEditData } = require("../utils/validations");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            // throw new Error("Invalid user");
            return res.status(400).json({
                success: false,
                message: "Invalid User"
            });

        } else {
            return res.status(200).json({
                success: true,
                message: "user data",
                data: user
            })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditData(req)) {
            return res.status(400).json({
                message: "Invalid Edit request"
            });
        }

        const loggedinUser = req.user;

        // console.log(loggedinUser);
        // console.log(req.body);

        res.status(200).json({
            message: "Profile edit request is valid",
            data: req.body
        });

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = profileRouter;
