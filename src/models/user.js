const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // id:{
    //     type:Object,
    // },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        //required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
});


const UserModel = mongoose.model("user", userSchema);
//1st place name of the model, 2nd what we created schema. 
//when we use The model always first letter is Captal.
module.exports = UserModel;
