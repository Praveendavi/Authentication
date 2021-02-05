require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 5000

// Mongodb connection
require('./Database/Db')

//Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

// require('./controllers/sendMail')

// models
require('./models/User')

// Routes
app.use(require('./routes/auth'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build', 'index.html'))
    })
}

app.listen(PORT, () =>{
    console.log(`Server is running on Port ${PORT}`)
})