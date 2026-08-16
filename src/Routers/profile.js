const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const { validateEditData } = require("../utils/validations");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("Invalid user");
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, (req, res) => {
    if (!validateEditData(req)) {
        throw new Error("Invalid Credentials");
    };

    const LoggedinUser = req.user;
    Object.keys(req.body).forEach(key => LoggedinUser[key] = req.body[key]);
    LoggedinUser.save();
    res.send(`${LoggedinUser.firstName}, your profile was updated`)
});

module.exports = profileRouter;
