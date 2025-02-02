const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function() {
                return this.password == this.confirmPassword
            },
            message: "Password and Confirm Password "
        }
    },
    // isAdmin : {
    //     type : Boolean,
    //     default : false,
    //     requiredd : true
    // }
    role: {
        type: String,
        enum: ["admin", "user", "partner"],
        required: true,
        default: "user"
    }
},
{timestamps : true}
)

userSchema.pre("save", function(){
    this.confirmPassword = undefined
})

const UserModel = mongoose.model("users", userSchema)

module.exports = UserModel