const ShowModel = require('../model/showModal')

const addShow = async (req, res) => {
    try {

        const show = new ShowModel(req.body)
        await show.save()

        res.send({
            success: true,
            message: "Show is added successfully!",
            data: show
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Some error has occured"
        })
    }
}

const updateShow = async (req, res) => {
    try {

        const show = await ShowModel.findByIdAndUpdate(req.body.id, req.body)

        res.send({
            success: true,
            message: "Show updated successfully",
            data: show
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Some error has occured"
        })
    }
}

const deleteShow = async (req, res) => {
    try {
        
        const showId = await ShowModel.findByIdAndDelete(req.params.showId)

        res.send({
            success: true,
            message: "Show deleted successfully!",
            data: showId
        })

    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Some error has occured"
        })
    }
}

const getAllShowsByTheater = async (req, res) => {
    try {

        const show = await ShowModel.find({theater: req.params.theaterId}).populate("movie")
        //console.log(show)
        res.send({
            success: true,
            message: "data fetched",
            data: show
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Some error has occured"
        })
    }
}

const getAllTheatersByMovies = async (req, res) => {
    try {
        const {movie, date} = req.body
        //console.log("inside function")
    //get the show for the requested movie
    const shows = await ShowModel.find({movie, date}).populate("theater")
    //console.log(shows)
    //get the theaters for each show for the requested movie
    const unqiueTheaters = []
    shows.forEach((show) => {
        const isTheater = unqiueTheaters.find(theater => theater._id.toString() === show.theater._id.toString())
        //console.log(isTheater)
        if (!isTheater){
            unqiueTheaters.push({
                ...show.theater._doc,
                shows: shows.filter((s) => s.theater._id === show.theater._id)
              });
        }
    })

    res.send({
        success: true,
        message: "get all theaters by movies",
        data: unqiueTheaters
    })
    
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Some error has occured"
        })
    }

}

const getShowById = async (req, res) => {
    try {
        const showId = await ShowModel.findById(req.params.showId)
        res.send({
            success: true,
            message: "Get show by id",
            data: showId
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Some error has occured"
        })   
    }
}

module.exports = {
    addShow, updateShow, deleteShow, getAllShowsByTheater, getAllTheatersByMovies, getShowById
}