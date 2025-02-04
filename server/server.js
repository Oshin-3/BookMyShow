const express = require('express')

//Routers
const userRouter = require('./routes/userRoutes')
const movieRouter = require('./routes/movieRoutes')

const app = express()
app.use(express.json())

//connect to database
const connectDb = require('./config/dbConfig')
connectDb()


//user router
app.use('/api/users/', userRouter)
//movie router
app.use('/api/movies/', movieRouter)

app.listen(8082, () => 
{
    console.log("Server running at port 8082")
})