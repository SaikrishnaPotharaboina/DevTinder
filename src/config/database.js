const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://saikrishna322004_db_user:2Pts5BDaaJQeGOc8@learning1.ddcyhrz.mongodb.net/DevTinder");
};

module.exports = connectDB;


