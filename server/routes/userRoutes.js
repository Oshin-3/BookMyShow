const express = require('express')
const { addUser, getAllUsers, loginUser, getCurrentUser } = require('../controller/userController')
const { auth } = require('../middleware/authMiddleware')
const userRouter = express.Router()

//add user
userRouter.post('/add-user', addUser)
//get all users
userRouter.get('/all-users', getAllUsers)
//login users
userRouter.post('/login', loginUser)
//get current users
userRouter.get('/get-current-user', auth, getCurrentUser)

module.exports = userRouter