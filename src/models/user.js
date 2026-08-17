const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    // id:{
    //     type:Object,
    // },
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
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
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("inavalid Email : " + value);
            };
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Keep Strong Password Its to week : " + value);
            };
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 50,
    },
    skills: {
        type: [String],
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid")
            };
        }
    },
}, { timestamps: true });


userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await JWT.sign({ _id: user._id }, "SAI@!143", { expiresIn: "1d" });
    return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user?.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}
const UserModel = mongoose.model("user", userSchema);
//1st place name of the model, 2nd what we created schema. 
//when we use The model always first letter is Captal.
module.exports = UserModel;
