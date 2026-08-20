const mongoose = require("mongoose");
const validator = require("validator")


const connectonRequestSchema = new mongoose.Schema({

    toUserId: {
        // its take user id
        type: mongoose.Schema.Types.ObjectId,
        require: true,


    },
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} incorrect status type`
        }
    },
}, {
    timestamps: true,
});

const ConnectonRequest = new mongoose.model("ConnectonRequest", connectonRequestSchema);



module.exports = ConnectonRequest;
