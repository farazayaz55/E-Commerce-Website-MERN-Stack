// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.geeksforgeeks.org%2Fmiddleware-in-express-js%2F&psig=AOvVaw1jH1VMh-RK2nQrKjZO5ai5&ust=1669735302101000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLjKv_CW0fsCFQAAAAAdAAAAABAJ
const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(400).json({msg: "Invalid Authentication"})

            req.user = user
            next()//call the next middle ware
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth