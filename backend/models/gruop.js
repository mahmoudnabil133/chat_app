const mongoose = require('mongoose')


const groupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    groupPic: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('group', groupSchema);
