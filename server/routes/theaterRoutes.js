const theaterRouter = require('express').Router()
const { addTheater, updateTheater, deleteTheater, getAllTheaterByOwner, getAllTheaters, getTheaterById } = require('../controller/theaterController')

theaterRouter.post('/add-theater', addTheater)
theaterRouter.put('/update-theater', updateTheater)
theaterRouter.delete('/delete-theater/:theaterId', deleteTheater)
theaterRouter.get('/get-all-theaters', getAllTheaters)
theaterRouter.get('/get-all-theaters-by-owner/:ownerId', getAllTheaterByOwner)
theaterRouter.get('/get-theater-by-id/:theaterId', getTheaterById)

module.exports = theaterRouter