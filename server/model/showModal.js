const mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    showName: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        rquired: true
    },
    auditoriumName: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },

    totalSeats: {
        type: Number
    },
    bookedSeats: {
        type: Array,
       
    },
    movie: {
        type: mongoose.Schema.ObjectId,
        ref: "movies",
        required: true
    },
    theater: {
        type: mongoose.Schema.ObjectId,
        ref: "theater",
        required: true
    }
})

const ShowModel = mongoose.model("shows", showSchema)
module.exports = ShowModel