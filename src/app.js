const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("hello ")
});

app.use("/hello", (req, res) => {
    res.send("hello saikrishna ")
});


app.listen(3000, () => {
    console.log("server is successful listing")
});

