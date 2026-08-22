const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validations");
const bcrypt = require("bcrypt");
//const JWT = require("jsonwebtoken");




authRouter.post("/singUp", async (req, res) => {
    try {
        //validate your data
        validateSignUpData(req)

        // Encrypt Your Password
        const { firstName, lastName, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        // console.log(req.body)
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }
        // creating new user model 
        const user = new User({
            firstName, lastName, email, password: passwordHash
        });

        //always use try catch when we creating db data

        await user.save();
        res.send("user added succesfull");

    } catch (error) {
        res.status(400).send("ERROR :" + error.message);
    };
});


authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Credentials");
        };
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token, { expires: new Date(Date.now() + 900_000), });
            res.send("Login Succesfull!!")
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (error) {
        res.status(400).send("ERROR :" + error.message);
    };
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });

    res.send("loggedout succesfull");
});


module.exports = authRouter;
