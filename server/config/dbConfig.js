const mongoose = require('mongoose')
require('dotenv').config()

const dbUrl = process.env.DB_URL

const connectDb = async() => {
    try {
        await mongoose.connect(dbUrl)
        console.log("Connected to database")
    } catch (error) {
        console.log("Error connecting to Mongo DB")
    }
    
}

module.exports = connectDb