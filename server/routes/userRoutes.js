const express = require('express')
const { addUser, getAllUsers, loginUser } = require('../controller/userController')
const userRouter = express.Router()

//add user
userRouter.post('/add-user', addUser)
//get all users
userRouter.get('/all-users', getAllUsers)
//login users
userRouter.post('/login', loginUser)

module.exports = userRouter