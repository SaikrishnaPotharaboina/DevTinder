const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt")
const User = require("../models/user");
const { userAuth } = require("../Middlewares/auth");
const { validateEditData } = require("../utils/validations");
const validator = require("validator");


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
            });
        };
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

        Object.keys(req.body).forEach((field) => {
            loggedinUser[field] = req.body[field];
        });

        await loggedinUser.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            data: loggedinUser
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});



profileRouter.patch("/profile/forgot-password", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !validator.isEmail(email)) {
            throw new Error("Valid email is required");
        }
        if (!password || !validator.isStrongPassword(password)) {
            throw new Error("Strong password is required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found, incorrect email address entered");
        }



        const isSamePassword = await user.validatePassword(password);
        if (isSamePassword) {
            throw new Error("New password should not be same as old password");
        };

        const newPasswordHash = await bcrypt.hash(password, 10);


        user.password = newPasswordHash;
        await user.save();

        res.status(200).send("User password saved successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = profileRouter;
