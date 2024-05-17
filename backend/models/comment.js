const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:true
    },
    content:{
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('comment', commentSchema)
