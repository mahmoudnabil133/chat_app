const express = require('express')
const app = express()
const Port = process.env.PORT || 3005
const connectDb = require('./config/config')
const cors = require('cors')
const router = require('./routes/routes')
require('dotenv').config()

// middlewares


app.use(cors())
app.use(express.json())
app.use('/api', router)


connectDb().then(()=>{
    app.listen(Port, ()=>{
        console.log('connected to db')
        console.log(`app is listining on port ${Port}`)
      })
      
})
