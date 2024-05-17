const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    name:String,
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String,
    role: String
},
{
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)
