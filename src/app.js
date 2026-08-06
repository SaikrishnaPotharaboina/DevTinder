const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/singUp", async (req, res) => {
    // creating new instance user model   // dumi data sending to db to cheking
    const user = new User({
        firstName: "priya",
        lastName: "Mattepally",
        EmailId: "jahnavi@gmail.com",
        password: "krihshna",
        age: "24",
        place: "hanumkonda"
    });

    //always use try catch when we creating db data
    try {
        await user.save();
        res.send("user added succesfull");

    } catch (error) {
        res.status(400).send("error saving user" + error.message);
    };
});

connectDB().then(() => {
    console.log("connected succesfull with DB")
    app.listen(3000, () => {
        console.log("server is successful listing")
    });
}).catch(err => {
    console.error("connection error with db")
});


