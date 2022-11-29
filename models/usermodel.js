//we are creating a user model (DB table and exporting in mongoDB)
//like in django we used to create a model
//then we used to run django migrations to export the table
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {//column name
        type: String,//datatype
        required: true,
        trim: true//trim
        //"  hello", or "hello ", or "  hello ", would end up being saved as "hello" in Mongo - i.e. white spaces will be removed from both sides of the string.
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)