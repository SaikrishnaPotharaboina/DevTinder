const mongoose = require("mongoose");
const validator = require("validator")


const connectonRequestSchema = new mongoose.Schema({

    toUser: {
        // its take user id
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "intrested", "accepted", "rejected"],
            message: `{VALUE} incorrect status type`
        },
    },
}, {
    timestamps: true,
});

const ConnectonRequest = new mongoose.model("connectonRequest", connectonRequestSchema);

module.exports = ConnectonRequest;
