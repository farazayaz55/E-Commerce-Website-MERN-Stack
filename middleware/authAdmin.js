//https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.geeksforgeeks.org%2Fmiddleware-in-express-js%2F&psig=AOvVaw1jH1VMh-RK2nQrKjZO5ai5&ust=1669735302101000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLjKv_CW0fsCFQAAAAAdAAAAABAJ
//see the figure for understanding off middlewares

//when we have request for some resource the call is sent to authadmin middleware it checks whether u are a admin or not
//if you are the admin then you call the next middleware(if there is no next middle ware the respond will be send to server)

//for example u access a page u dont have right for it you are passed to the middleware of login page
const Users = require('../models/userModel')

const authAdmin = async (req, res, next) =>{
    try {
        // Get user information by id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role === 0) 
            return res.status(400).json({msg: "Admin resources access denied"})

        next()//call the next middle ware in middle ware stack
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin