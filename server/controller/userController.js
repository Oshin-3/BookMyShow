const UserModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

//add user
const addUser = async (req, res) => {
    try {

        const userExists = await UserModel.findOne({email: req.body.email})

        if (userExists) {
            return res.send({
                success: false,
                message: "User already exists!"
            })
        }

        const newUser = new UserModel(req.body)
        await newUser.save()

        res.send({
            success: true,
            message: "User added successfully"
        })
        
    } catch (error) {
        return res.send({
            success: false,
            message: error
        })
    }
}

//get all users
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find()

        res.send({
            success: true,
            message: allUsers
        })
    } catch (error) {
        
    }
}

//login user
const loginUser = async (req, res) => {
    const userId = await UserModel.findOne({email: req.body.email})

    const token = jwt.sign({userId: userId._id}, process.env.JWT_SECRET, {expiresIn: "1m"})
    if (!userId){
        res.send({
            success: false,
            message: "User not found! Please sign up"
        })
    }
    else if (userId.password !== req.body.password){
        res.send({
            success: false,
            message: "Invalid password"
        })
    }
    else{
        res.send({
            success: true, 
            user: userId,
            data: token,
            message: "Login Successfully"
        })
    }
}

module.exports = {
    addUser,
    getAllUsers,
    loginUser
}