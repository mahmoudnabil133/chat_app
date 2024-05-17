const mongoose = require('mongoose')
require('dotenv').config()
const connectDb = async ()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDb
