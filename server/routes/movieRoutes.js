const express = require('express')
const { getAllMovies, addMovie, updateMovie, deleteMovie, getMovieById} = require('../controller/movieController')

const moiveRouter = express.Router()

moiveRouter.get("/get-all-movies", getAllMovies)
moiveRouter.post("/add-movie", addMovie)
moiveRouter.put("/update-movie", updateMovie)
moiveRouter.put("/delete-movie", deleteMovie)
moiveRouter.get("/movie/:id", getMovieById)

module.exports = moiveRouter