const jwt = require('jsonwebtoken')
const authentication = async(req, res, next) =>{
    try{
        const token = req.header("Authorization")
        if(!token){
            return res.status(400).json({ error: 'Invalid Authentication' })
        }
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN,(err, user) =>{
            if(err){
                return res.status(400).json({ error: "Invalid Authentication" })
            }
            req.user = user
            next()
        })
    }
    catch(err){
        res.status(422).json({ error: err.message })
    }
}

module.exports = authentication