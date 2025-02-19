const showRouter = require('express').Router()
const { addShow, updateShow, deleteShow, getAllShowsByTheater, getShowById, getAllTheatersByMovies } = require('../controller/showController')

showRouter.post('/add-show', addShow)
showRouter.put('/update-show', updateShow)
showRouter.delete('/delete-show/:showId', deleteShow)
showRouter.get('/get-all-shows-by-theater/:theaterId', getAllShowsByTheater)
showRouter.post('/get-all-theaters-by-movie', getAllTheatersByMovies)
showRouter.get('/get-show-by-id/:showId', getShowById)

module.exports = showRouter