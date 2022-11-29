require('dotenv').config()// including dot env file , require is used as include in js
const express = require('express')//we include server
const mongoose = require('mongoose')
const cors = require('cors')//what is cors? cors tells your server to respond to web browsers 
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')


const app = express() //we make server call it app
app.use(express.json())//. use specifies the function at given url
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
//router can be of app.use or app.get ,post,put
//use is used for making routes or making a new app
//get post put is for defining the pages

//app.get vs router.get

//app mean localhost app.get  / means locahlost:5000/
//router.get means localhost:5000/<app></app>/ get
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))

app.get('/',(req,res)=>
    {
        res.json({msg:"Hi faraz"});
    }
)  //when we access server "/" we will get respond of hi faraz

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})