const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../Middlewares/auth")



requestRouter.post("/sendconnection", userAuth, async (req, res) => {

    const user = req.user;
    res.send(user.firstName + " : connction sent succesfull")

});


module.exports = requestRouter;
