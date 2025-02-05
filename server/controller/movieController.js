const MovieModel = require('../model/movieModel')

//get all movies 
const getAllMovies = async (req, res) => {
    try {
        const allMovies = await MovieModel.find()
        
        res.send({
            success: true,
            data: allMovies,
            message: "Fetched All Movies"
        })
    } catch (error) {
        res.status("500").json({
            success: false,
            message: "Some error occured"
        })
    }
}

//add movies
const addMovie = async (req, res) => {
    try {
        const movie = new MovieModel(req.body)
        await movie.save()

        res.send({
            success: true, 
            message: "Movie Added Successfully!"
        })
        
    } catch (error) {
        console.log(error)
        res.status("500").json({
            success: false,
            message: error
        })
    }
}

//update movie
const updateMovie = async (req, res) => {
    try {

        const updatedMovie = await MovieModel.findByIdAndUpdate(req.body.id, req.body)
        
        res.send({
            success: true,
            message: "Movie is updated successfully!",
            data:  updatedMovie
        })
        
    } catch (error) {
        res.status("500").json({
            success: false,
            message: "Some error occured"
        })
    }
}

//delete movie
const deleteMovie = async (req, res) => {
    try {
        const movie_Id = await MovieModel.findByIdAndDelete(req.body.id)

        res.send({
            success: true,
            message: "Movie Deleted Successfully",
            data: movie_Id
        })
        
    } catch (error) {
        res.status("500").json({
            success: false,
            message: "Some error occured"
        })
    }
}

module.exports = {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie
}