const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    content:{
        type: String,
        required: true
    },
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'group'
    }
}, {
    timestamps: true
}) 

module.exports = mongoose.model('post', postSchema)
