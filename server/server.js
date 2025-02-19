const express = require('express')

//Routers
const userRouter = require('./routes/userRoutes')
const movieRouter = require('./routes/movieRoutes')
const theaterRouter = require('./routes/theaterRoutes')
const showRouter = require('./routes/showRoutes')

const app = express()
app.use(express.json())

//connect to database
const connectDb = require('./config/dbConfig')
connectDb()


//user router
app.use('/api/users/', userRouter)
//movie router
app.use('/api/movies/', movieRouter)
//theater router
app.use('/api/theaters', theaterRouter)
//show routes
app.use('/api/shows', showRouter)

app.listen(8082, () => 
{
    console.log("Server running at port 8082")
})