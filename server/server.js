const express = require('express')

const userRouter = require('./routes/userRoutes')

const app = express()
app.use(express.json())

//connect to database
const connectDb = require('./config/dbConfig')
connectDb()


//user router
app.use('/api/users/', userRouter)

app.listen(8082, () => 
{
    console.log("Server running at port 8082")
})