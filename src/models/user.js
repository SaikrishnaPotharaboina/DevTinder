const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    }
});


const UserModel = mongoose.model("user", userSchema);
//1st place name of the model, 2nd what we created schema 
//when we use model the first letter is Captal
module.exports = UserModel;
