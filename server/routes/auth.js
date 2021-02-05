const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { CLIENT_URI } = process.env
const sendMail = require('../controllers/sendMail')
const Authentication = require('../middleware/Authentication')

router.post('/signup', async(req, res) =>{
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(422).json({ error: 'Plase fill the all fields' })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(422).json({ error: 'This email is already exsist' })
        }
        if(password.length < 6){
            
            return res.status(422).json({ error: 'Password must be at least 6 character' })
        }
        const hashedpassword = await bcrypt.hash(password, 12)
        const newUser = {
            name, email, password:hashedpassword
        }
        const activation_token = createActivationToken(newUser)

        const url = `${CLIENT_URI}/${activation_token}`
        sendMail(email, url, "Plase verify your email")

        res.json({ message: 'Signup success Plase active your account' })
    }
    catch(error){
        return res.status(500).json({ error: error.message })
    }
})

router.post('/activation', async(req, res) =>{
    try{
        const { activation_token } = req.body;
        const user = jwt.verify(activation_token, process.env.JWT_ACTIVATION_TOKEN)
        const { name, email, password } = user
        const check = await User.findOne({email})
        if(check){
            return res.status(422).json({ error: 'This email is already exsist' })
        }
        
        const newUser = await new User({
            name, email, password
        })
        await newUser.save()
        res.json({ message: 'Your Account has been activate' })
    }
    catch(error){
        return res.status(500).json({ error: error.message })
    }
})

router.post('/signin', async(req, res) =>{
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(422).json({  error: 'Plase Fill The All Fields' })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(422).json({ error: 'Invalid Email And Password' })
        }
        const doMatch = await bcrypt.compare(password,user.password)
        if(!doMatch){
            return res.status(422).json({ message: 'Invalid Email And Password' })
        }
        const refresh_token = createRefreshToken({ _id: user._id })

        res.cookie('refreshtoken',refresh_token,{
            httpOnly: true,
            path:'/user/refresh_token',
            maxAge: 7*24*60*60*1000 // 7 days
        })
        res.json({ message: 'Signin successfully' })
    }
    catch(error){
        return res.status(422).json({ error: error.message })
    }
})

router.post('/user/refresh_token', async(req, res) =>{
    try{
        const rf_token = req.cookies.refreshtoken
        if(!rf_token) return res.status(400).json({error: "Please login now!"})

        jwt.verify(rf_token, process.env.JWT_REFRESH_TOKEN, (error, user) => {
            if(error) return res.status(400).json({error: "Please login now!"})
            const access_token = createAccessToken({id: user._id})
            res.json({access_token})
        })
    }
    catch(error) {
        return res.status(500).json({error: error.message})
    }
})

router.post('/user/forget_password', async(req , res) =>{
    try{
        const { email } = req.body;
        const user = await User.findOne({email})
        if(!email){
            return res.status(422).json({ error: 'Plase Fill The Valid Email' })
        }
        if(!user){
            return res.status(422).json({ error: 'Invalid email' })
        }
        const access_token = createAccessToken({id: user._id})
        const url = `${CLIENT_URI}/user/reset/${access_token}`
        sendMail(email, url, "Reset your password")
        res.json({ message: 'Password Reset Plase Check Your Email ' })
    }   
    catch(error){
        return res.status(500).json({error: "something went wrong"})
    }
})
router.post('/user/reset_password',Authentication, async(req, res) =>{
        try{
            const { password } = req.body;
            const passwordhashed = await bcrypt.hash(password, 15)
            await User.findOneAndUpdate({ _id: req.user.id },{
                password: passwordhashed
            })
            res.json({ message: 'Password Successfully Changed' })
        }
        catch(error){
            res.json({ error: error.message })
        }
})

router.get('/user/info', async(req, res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
    }
    catch(error){
        res.json({ error: error.message })
    }
})

const createActivationToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_ACTIVATION_TOKEN, { expiresIn: '10m' })
}
const createAccessToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '20m' })
}
const createRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' })
}

module.exports = router