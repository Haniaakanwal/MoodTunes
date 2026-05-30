const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username must be required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be required"]
    },
    password:{
            type:String,
        required:[true,"password is required"],
        select :false
    }
    
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel

// userSchema.pre("save", function (next) { })
// userSchema.post("save", function (next) { }) I