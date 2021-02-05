const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () =>{
    console.log('Mongodb is successfully connected')
})

mongoose.connection.on('error', () =>{
    console.log('Error to connect db')
})
