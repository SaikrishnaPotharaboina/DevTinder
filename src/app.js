const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json())

app.post("/singUp", async (req, res) => {
    // console.log(req.body)

    // creating new user model 
    const user = new User(req.body);

    //always use try catch when we creating db data
    try {
        await user.save();
        res.send("user added succesfull");

    } catch (error) {
        res.status(400).send("error saving user" + error.message);
    };
});

//userAPI - GET /user firstName of the  user data from database.
//you can see the data using what you want main we use "find() method"
app.get("/user", async (req, res) => {
    const userName = req.body.firstName;
    try {

        const user = await User.findOne({ firstName: userName });
        res.send(user);
        // const users = await User.find({ firstName: userName });
        // if (user.length === 0) {
        //     res.status(404).send("User is not found");
        // } else {
        //     res.send(user._id);
        // }
    } catch (error) {
        res.status(400).send("user name not there");
    }
});

//Feed API - GET /"Feed"  get the all user data from database.
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch (error) {
        res.status(400).send("Users are not Found");
    }
});

// ID API - GET "ID" by userName or firstName
app.get("/id", async (req, res) => {
    const userName = req.body.firstName;
    try {

        const user = await User.findById({ _id: userName });
        // res.send(user);
        // const users = await User.find({ firstName: userName });
        if (user.length === 0) {
            res.status(404).send("User is not found");
        } else {
            res.send(user._id);
        }
    } catch (error) {
        res.status(400).send("user name not there");
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        console.log(userId)
        //const user = await User.findByIdAndDelete(userId);

        const user = await User.findOneAndDelete({ _id: userId })

        if (!user) {
            res.status(404).send("User Already Deleted Succesfull");
        } else {
            res.send("User Delete Succesfull");
        }
    } catch (error) {
        res.status(400).send("Somthing Went Worng");
    }
});


app.put("/user", async (req, res) => {
    const userId = req.body.userId;
    const firstName = req.body.firstName
    try {
        const user = await User.findByIdAndUpdate(userId, { firstName }, { returnDocument: "after" })
        // console.log(req.body.userId);
        console.log(user);
        res.send(user)
    } catch (error) {
        res.status(400).send("Somthing Went Worng");
    }
})




connectDB().then(() => {
    console.log("connected succesfull with DB")
    app.listen(3000, () => {
        console.log("server is successful listing")
    });
}).catch(err => {
    console.error("connection error with db")
});


