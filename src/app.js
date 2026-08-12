const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const validateSignUpData = require("./utils/validations");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");


app.use(express.json())
app.use(cookieParser());

app.post("/singUp", async (req, res) => {
    try {
        //validate your data
        validateSignUpData(req)

        // Encrypt Your Password
        const { firstName, lastName, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        // console.log(req.body)

        // creating new user model 
        const user = new User({
            firstName, lastName, email, password: passwordHash,
        });

        //always use try catch when we creating db data

        await user.save();
        res.send("user added succesfull");

    } catch (error) {
        res.status(400).send("ERROR :" + error.message);
    };
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // checking myy email ID present or not in DB

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        //checking my password usint bcrypt compare

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {

            // JWT token
            // coockie

            res.cookie("token", "kadjahfuihsduifhdsiufhdisuhfiusdhfiusdhfiushdfuig");
            res.send("Login Succesfull!!")
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (error) {
        res.status(400).send("ERROR :" + error.message);
    };
});




app.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies;
        console.log(cookies);
        res.send(cookies);
    } catch (error) {
        res.status(500).send(error.message);
    }
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
});


app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["age", "skills", "gender", "password"]
        const isUpdatedAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdatedAllowed) {
            throw new Error("update is not allow")
        };
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { runValidators: true, returnDocument: "after" })
        // console.log(req.body.userId);
        res.send(user);

    } catch (error) {
        res.status(400).send("Somthing Went Worng : " + error.message);
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


