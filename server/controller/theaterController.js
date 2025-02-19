const TheaterModel = require('../model/theaterModel')

//add theater 
const addTheater = async(req, res) => {
    try {
        const theater = new TheaterModel(req.body)
        await theater.save()

        res.send({
            success: true, 
            message: "Theater Added Successfully!",
            data: theater
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Some error occured",
            error: error
        })
    }
}

//update theater
const updateTheater = async(req, res) => {
    try {
        
        const theaterId = await TheaterModel.findByIdAndUpdate(req.body.id, req.body)

        res.send({
            success: true, 
            message: "Theater Updated Successfully!",
            data: theaterId
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Some error occured"
        })
    }
}


//delete theater
const deleteTheater = async(req, res) => {
    try {

        const theaterId = await TheaterModel.findByIdAndDelete(req.params.theaterId)

        res.send({
            success: true,
            message: "Theater Deleted Successfully!",
            data: theaterId
        })
        
    } catch (error) {
        res.send({
            success: false,
            message: "Some error occured"
        })
    }
}

//get all theaters
const getAllTheaters = async (req, res) => {
    try {

        const allTheaters = await TheaterModel.find().populate("owner")

        res.send({
            success: true,
            message: "Fetched All Theater details!",
            data: allTheaters
        })
        
    } catch (error) {
        res.send({
            success: false,
            message: "Some error occured"
        })
    }
}

//get all theater by owner 
const getAllTheaterByOwner = async (req, res) => {
    try {

        const theaterByOwnerId = await TheaterModel.find({owner: req.params.ownerId})

        res.send({
            success: true, 
            message: "Theater details fetched",
            data: theaterByOwnerId
        })
        
    } catch (error) {
        res.send({
            success: false,
            message: "Some error occured"
        })
    }
}

const getTheaterById = async (req, res) => {
    try {

        const theater = await TheaterModel.findById({_id: req.params.theaterId})
        res.send({
            success: true, 
            message: "Theater details fetched",
            data: theater
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Some error occured"
        })
    }
}

module.exports = {
    addTheater,
    updateTheater,
    deleteTheater,
    getAllTheaters,
    getAllTheaterByOwner,
    getTheaterById
}