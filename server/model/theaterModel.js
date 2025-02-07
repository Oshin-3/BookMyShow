const mongoose = require('mongoose')

const theatherSchema = new mongoose.Schema({
    theaterName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String, 
        required: true
    },
    state: {
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        //required: true
    },
    comment: {
        type: String
    },
    status: {
        type: String,
        enum: ["Approved", "In Progress", "Rejected"],
        //required: true,
        default: "In Progress"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
},
    {
        timestamps: true
    })

    const TheaterModel = mongoose.model("theater", theatherSchema)

    module.exports = TheaterModel